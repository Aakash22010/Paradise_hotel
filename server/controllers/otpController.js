const nodemailer = require('nodemailer');

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP email:', error);
    } else {
      console.log('OTP email sent: ' + info.response);
    }
  });
}

function storeOtp(email, otp) {
  otpStore[email] = otp;
  setTimeout(() => {
    delete otpStore[email];
  }, 300000); // 5 minutes
}

function verifyOtp(email, otp) {
  return otpStore[email] === otp;
}

module.exports = {
  generateOtp,
  sendOtpEmail,
  storeOtp,
  verifyOtp,
};
