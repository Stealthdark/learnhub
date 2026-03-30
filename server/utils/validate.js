function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  if (!password || password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
}

function requireFields(body, fields) {
  const missing = fields.filter(f => body[f] === undefined || body[f] === null || body[f] === '');
  return missing.length ? `Missing required fields: ${missing.join(', ')}` : null;
}

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, password, ...safe } = user;
  return safe;
}

module.exports = { validateEmail, validatePassword, requireFields, sanitizeUser };
