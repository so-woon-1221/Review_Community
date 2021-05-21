const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  comment: {
    type: Array(ObjectId),
    ref: 'Comment',
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Board', boardSchema);
