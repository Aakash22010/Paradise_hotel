const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Handle preflight for booking route
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Calculate amount (example: $100 per night)
    const checkin = new Date(req.body.checkin);
    const checkout = new Date(req.body.checkout);
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    const amount = nights * 100 * 100; // in paise (100 paise = 1 rupee)

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `booking_${booking._id}`,
      payment_capture: 1
    });

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking,
      order 
    });
    
  } catch (error) {
    console.error('🔥 Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking',
      error: error.message 
    });
  }
});

module.exports = router;