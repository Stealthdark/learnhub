const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOtpEmail(toEmail, toName, code) {
  await transporter.sendMail({
    from: `"LearnHub" <${process.env.SMTP_FROM}>`,
    to: toEmail,
    subject: 'Your LearnHub verification code',
    text: `Hi ${toName},\n\nYour verification code is: ${code}\n\nThis code expires in 15 minutes.\n\n— LearnHub`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="color:#1a73e8;margin-bottom:8px">Verify your email</h2>
        <p>Hi ${toName},</p>
        <p>Your LearnHub verification code is:</p>
        <div style="font-size:40px;font-weight:700;letter-spacing:10px;font-family:monospace;
                    background:#f1f3f4;border-radius:8px;padding:20px;text-align:center;margin:20px 0">
          ${code}
        </div>
        <p style="color:#666;font-size:13px">This code expires in <strong>15 minutes</strong>.</p>
        <p style="color:#666;font-size:13px">If you didn't request this, you can safely ignore this email.</p>
        <p style="color:#999;font-size:12px;margin-top:24px">— LearnHub Team</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };
