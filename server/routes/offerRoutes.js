const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');


router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ validTill: 1 });
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, imageUrl, validTill } = req.body;
  try {
    const newOffer = new Offer({ title, description, imageUrl, validTill });
    await newOffer.save();
    res.status(201).json({ message: 'Offer created successfully' });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
