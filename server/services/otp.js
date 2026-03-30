const crypto = require('crypto');

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

function isOtpExpired(otp) {
  if (!otp?.expiresAt) return true;
  return new Date() > new Date(otp.expiresAt);
}

module.exports = { generateOtp, isOtpExpired };
