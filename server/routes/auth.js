const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');
const { getUserByEmail, getUserById, setUser, saveOtp, getOtp, deleteOtp } = require('../services/firestore');
const { sendOtpEmail } = require('../services/email');
const { generateOtp, isOtpExpired } = require('../services/otp');
const { validateEmail, validatePassword, requireFields, sanitizeUser } = require('../utils/validate');

const router = express.Router();
const SALT_ROUNDS = 12;

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/* POST /api/auth/signup
   Creates a pending OTP + sends email. User is created on verify. */
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const missing = requireFields(req.body, ['name', 'email', 'password']);
    if (missing) return res.status(400).json({ error: missing });
    if (!validateEmail(email)) return res.status(400).json({ error: 'Invalid email address' });
    const pwError = validatePassword(password);
    if (pwError) return res.status(400).json({ error: pwError });

    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const code = generateOtp();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // Store pending signup data alongside the OTP (deleted on verify)
    await saveOtp(email, code, { name: name.trim(), passwordHash });
    await sendOtpEmail(email, name.trim(), code);

    res.json({ message: 'Verification code sent', email: email.toLowerCase() });
  } catch (err) {
    next(err);
  }
});

/* POST /api/auth/verify-email
   Validates OTP, creates user, returns JWT. */
router.post('/verify-email', async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'email and code are required' });

    const otp = await getOtp(email);
    if (!otp) return res.status(400).json({ error: 'No pending verification for this email' });
    if (isOtpExpired(otp)) {
      await deleteOtp(email);
      return res.status(400).json({ error: 'Verification code expired — please sign up again' });
    }
    if (otp.code !== code.trim()) return res.status(400).json({ error: 'Invalid code' });

    const newUser = {
      id: uuidv4(),
      email: email.toLowerCase(),
      name: otp.name,
      passwordHash: otp.passwordHash,
      role: 'user',
      verified: true,
      avatar: '',
      bio: '',
      joinedAt: new Date().toISOString(),
      enrolledCourses: [],
    };
    await setUser(newUser);
    await deleteOtp(email);

    const token = signToken(newUser);
    res.json({ token, user: sanitizeUser(newUser) });
  } catch (err) {
    next(err);
  }
});

/* POST /api/auth/login */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    if (!user.verified) return res.status(401).json({ error: 'Email not verified' });

    // Support both bcrypt hashes and the legacy plaintext field (pre-migration)
    let valid = false;
    if (user.passwordHash) {
      valid = await bcrypt.compare(password, user.passwordHash);
    } else if (user.password) {
      // Legacy plaintext — compare directly then upgrade on the fly
      valid = user.password === password;
      if (valid) {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const { password: _removed, ...upgraded } = { ...user, passwordHash };
        await setUser(upgraded);
      }
    }

    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const freshUser = await getUserByEmail(email);
    const token = signToken(freshUser);
    res.json({ token, user: sanitizeUser(freshUser) });
  } catch (err) {
    next(err);
  }
});

/* POST /api/auth/resend-otp */
router.post('/resend-otp', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const existing = await getOtp(email);
    if (!existing) return res.status(404).json({ error: 'No pending verification for this email' });

    const code = generateOtp();
    await saveOtp(email, code, { name: existing.name, passwordHash: existing.passwordHash });
    await sendOtpEmail(email, existing.name || 'there', code);

    res.json({ message: 'Verification code resent' });
  } catch (err) {
    next(err);
  }
});

/* POST /api/auth/logout — stateless; client drops the token */
router.post('/logout', verifyToken, (_req, res) => {
  res.json({ message: 'Logged out' });
});

/* GET /api/auth/me — restore session from JWT */
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
