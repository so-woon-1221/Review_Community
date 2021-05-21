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
    sorted = { comment: -1 };
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

router.post('/question', async (req, res, next) => {
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

router.get('/question/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const question = await Board.findOne({ _id: id })
      .populate('author')
      .populate('comment');
    res.send(question);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/question/:id/comment', async (req, res, next) => {
  const id = req.params.id;
  const comment = req.body.commentId;
  let question = '';
  try {
    question = await Board.findOne({ _id: id })
      .populate('author')
      .populate('comment');
    const newComment = question.comment;
    console.log(newComment);
    newComment.push(comment);
    question = await Board.findOneAndUpdate(
      { _id: id },
      { comment: newComment },
      { new: true },
    )
      .populate('author')
      .populate('comment');
    res.send(question);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
