const express = require('express');
const bcrypt = require('bcrypt');
const { verifyToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const { getUsers, getUserById, setUser, deleteUser } = require('../services/firestore');
const { validatePassword, requireFields, sanitizeUser } = require('../utils/validate');

const router = express.Router();
const SALT_ROUNDS = 12;

function canAccess(req, targetId) {
  return req.user.id === targetId || req.user.role === 'admin';
}

/* GET /api/users — admin only */
router.get('/', verifyToken, requireAdmin, async (_req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users.map(sanitizeUser));
  } catch (err) {
    next(err);
  }
});

/* GET /api/users/:id */
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    if (!canAccess(req, req.params.id)) return res.status(403).json({ error: 'Forbidden' });
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/users/:id — own profile or admin; only admin can change role */
router.patch('/:id', verifyToken, async (req, res, next) => {
  try {
    if (!canAccess(req, req.params.id)) return res.status(403).json({ error: 'Forbidden' });

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updates = { ...req.body };
    // Strip fields that must never be set via PATCH
    delete updates.id;
    delete updates.email;
    delete updates.passwordHash;
    delete updates.password;
    delete updates.verified;
    // Only admin may change role
    if (updates.role !== undefined && req.user.role !== 'admin') delete updates.role;

    const updated = { ...user, ...updates };
    await setUser(updated);
    res.json(sanitizeUser(updated));
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/users/:id/password — own user only */
router.patch('/:id/password', verifyToken, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: 'Forbidden' });
    const missing = requireFields(req.body, ['currentPassword', 'newPassword']);
    if (missing) return res.status(400).json({ error: missing });
    const { currentPassword, newPassword } = req.body;

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Support both bcrypt and legacy plaintext
    let valid = false;
    if (user.passwordHash) {
      valid = await bcrypt.compare(currentPassword, user.passwordHash);
    } else if (user.password) {
      valid = user.password === currentPassword;
    }
    if (!valid) return res.status(400).json({ error: 'Incorrect current password' });

    const pwError = validatePassword(newPassword);
    if (pwError) return res.status(400).json({ error: pwError });

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const { password: _removed, ...updated } = { ...user, passwordHash };
    await setUser(updated);
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
});

/* POST /api/users/:id/enroll */
router.post('/:id/enroll', verifyToken, async (req, res, next) => {
  try {
    if (!canAccess(req, req.params.id)) return res.status(403).json({ error: 'Forbidden' });
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: 'courseId required' });

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const enrolled = user.enrolledCourses || [];
    if (enrolled.includes(courseId)) return res.json(sanitizeUser(user));

    const updated = { ...user, enrolledCourses: [...enrolled, courseId] };
    await setUser(updated);
    res.json(sanitizeUser(updated));
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/users/:id — admin only */
router.delete('/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
