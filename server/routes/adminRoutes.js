// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const Offer = require('../models/Offer');
const Feedback = require('../models/Feedback');
const Hotel = require('../models/Hotel');
const CategoryData = require('../models/CategoryData');

// --- OFFER ROUTES ---
router.get('/offers', async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

router.post('/offers', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/offers/:id', async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Offer deleted' });
});

// --- FEEDBACK ROUTES (READ ONLY) ---
router.get('/feedbacks', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

// --- HOTEL ROUTES ---
router.get('/hotels', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.post('/hotels', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/hotels/:id', async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hotel deleted' });
});

// --- CATEGORY DATA ROUTES ---
router.get('/categories', async (req, res) => {
  const categories = await CategoryData.find();
  res.json(categories);
});

router.post('/categories', async (req, res) => {
  try {
    const cat = new CategoryData(req.body);
    await cat.save();
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  await CategoryData.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
});

module.exports = router;
