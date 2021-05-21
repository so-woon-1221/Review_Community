const express = require('express');
const Board = require('../schemas/board');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { category, sort, search } = req.query;
  let filter = {};
  let sorted = { createdAt: -1 };
  if (category !== 'all') {
    filter.category = category;
  }
  if (sort === 'comment') {
    sorted = { 'comment.length': -1 };
  }
  if (search) {
    const exUser = await User.findOne({ name: search });
    if (exUser) {
      filter.author = exUser._id;
    } else {
      filter.$text = { $search: search };
    }
  }
  try {
    const count = await Board.find(filter).count();
    if (count > 0) {
      const board = await Board.find(filter).sort(sorted).populate('author');
      return res.send({ count, board });
    }
    return res.send({ count });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const question = (
      await Board.create({
        title,
        content,
        author,
      })
    ).populate('author');
    res.send(question);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
