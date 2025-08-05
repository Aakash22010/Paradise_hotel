const express = require('express');
const router = express.Router();
const { getCategoryData } = require('../controllers/dataController');

// GET /api/data?category=Deluxe Rooms
router.get('/data', getCategoryData);

module.exports = router;
