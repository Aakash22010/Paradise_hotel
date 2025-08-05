const express = require('express');
const router = express.Router();
const User = require('../models/user.js'); // NEW

const { sendOTP, verifyOTP } = require('../utils/mailer.js'); 

// Send OTP route
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // OTP sending logic
    await sendOTP(email);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ exists: false });
  }

  try {
    const existingUser = await User.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ exists: false });
  }
});

// Verify OTP and store user route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    // Verify OTP
    const isOtpValid = await verifyOTP(email, otp);
    
    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ 
        success: true, 
        message: 'You are already subscribed!' 
      });
    }

    // Create new user
    const newUser = new User({ email });
    await newUser.save();

    res.json({ 
      success: true, 
      message: 'Subscribed successfully! Thank you for joining.' 
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    
    // Handle duplicate key error separately
    if (error.code === 11000) {
      return res.json({ 
        success: true, 
        message: 'You are already subscribed!' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Subscription failed. Please try again.' 
    });
  }
});

module.exports = router;