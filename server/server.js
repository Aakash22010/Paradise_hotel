require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./db');
const otpRoutes = require('./routes/otpRoutes');
const nodemailer = require('nodemailer');
const feedbackRoute = require('./routes/feedback');
const offerRoutes = require('./routes/offerRoutes');
const dataRoutes = require('./routes/dataRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

connectDB().catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: "Server is running" });
});

app.use('/api/feedback', feedbackRoute);
app.use('/api/offers', offerRoutes);
app.use('/api', dataRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/admin', adminRoutes);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});


app.post('/api/contact', async (req, res) => {
  try {
    const { email, textarea: message } = req.body;

    // Validation
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Email and message are required'
      });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Email content
    const mailOptions = {
      from: `"Paradise Hotel Contact Form 📩" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: '📬 New Contact Form Submission - Paradise Hotel',
      text: `You have received a new message from the contact form on your website.

Email: ${email}

Message:
${message}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>📩 New Contact Form Submission</h2>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Message:</strong></p>
    <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #007BFF;">${message}</p>
    <hr />
    <p style="font-size: 0.9em; color: #666;">This message was sent from the Paradise Hotel contact form.</p>
  </div>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('🔥 Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

app.use('/api', otpRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Using email: ${process.env.EMAIL}`);
});