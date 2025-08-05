const mongoose = require('mongoose');

const categoryDataSchema = new mongoose.Schema({
  category: String, 
  title: String,
  description: String,
  price: Number,
  available: Boolean,
  images: [String],
  amenities: [String], 
  date: String,
  timing: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model('CategoryData', categoryDataSchema);
