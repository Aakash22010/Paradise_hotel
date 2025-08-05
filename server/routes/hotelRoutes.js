const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

router.get('/', async (req, res) => {
  try {
    const { city, stars, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (city) query.city = { $regex: new RegExp(city, 'i') };
    if (stars) query.star_rating = Number(stars);
    if (search) query.hotel_name = { $regex: new RegExp(search, 'i') };

    const hotels = await Hotel.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Hotel.countDocuments(query);

    res.json({
      hotels,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
