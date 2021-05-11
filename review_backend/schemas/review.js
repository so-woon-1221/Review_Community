const mongoose = require('mongoose');

const { Schema } = mongoose;
const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: String,
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
