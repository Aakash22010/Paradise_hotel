const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);