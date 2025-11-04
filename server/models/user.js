const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User', userSchema);
