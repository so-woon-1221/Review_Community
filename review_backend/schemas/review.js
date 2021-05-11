const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
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
    type: ObjectId,
    required: true,
    ref: 'User',
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
  recommend: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
