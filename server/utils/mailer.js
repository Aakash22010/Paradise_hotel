const nodemailer = require('nodemailer');
const crypto = require('crypto');
const OTPStorage = new Map();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate and send OTP
exports.sendOTP = async (email) => {
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  
  // Store OTP with expiration (5 minutes)
  OTPStorage.set(email, {
    otp,
    expires: Date.now() + 300000 // 5 minutes
  });

  // Send email
  const mailOptions = {
    from: `"Paradise Hotel OTP Service 🔐" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Your Verification Code',
    text: `
    Hello,

Your one-time password (OTP) for verification is: ${otp}

This code is valid for the next 5 minutes. Please do not share it with anyone.

If you did not request this, please ignore this email.

- Paradise Hotel Team
    `,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #007BFF;">🔐 Paradise Hotel - OTP Verification</h2>
    <p>Hello,</p>
    <p>Your one-time password (OTP) is:</p>
    <h3 style="background: #f0f0f0; padding: 10px 15px; display: inline-block; border-radius: 6px; font-size: 1.5em; letter-spacing: 2px;">
      ${otp}
    </h3>
    <p>This code is valid for the next <strong>5 minutes</strong>.</p>
    <p style="color: #c00;"><strong>Do not share</strong> this code with anyone for security reasons.</p>
    <hr />
    <p style="font-size: 0.9em; color: #777;">
      If you did not request this code, you can safely ignore this email.
    </p>
    <p style="font-size: 0.9em; color: #777;">– Paradise Hotel Security Team</p>
  </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Verify OTP
exports.verifyOTP = (email, otp) => {
  const stored = OTPStorage.get(email);
  
  if (!stored) {
    return false; // No OTP sent to this email
  }
  
  // Clear expired OTPs
  if (Date.now() > stored.expires) {
    OTPStorage.delete(email);
    return false;
  }
  
  // Verify match
  if (stored.otp === otp) {
    OTPStorage.delete(email);
    return true;
  }
  
  return false;
};