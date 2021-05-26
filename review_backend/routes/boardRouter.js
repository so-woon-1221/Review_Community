const express = require('express');
const Board = require('../schemas/board');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');
const jwt = require('jsonwebtoken');
const getCurrentTime = require('../public/getCurrentTime');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let { category, sort, search, limit } = req.query;
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
  if (!limit) {
    limit = 9;
  }
  try {
    const count = await Board.find(filter).count();
    const token = req.cookies['access_token'];
    let user = '';
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findOne({ email: decoded.email });
    }
    if (count > 0) {
      const board = await Board.find(filter)
        .sort(sorted)
        .populate('author')
        .limit(+limit);
      return res.send({ count, board, user });
    }
    return res.send({ count });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/question', async (req, res, next) => {
  try {
    const { title, content, category, thumbnail } = req.body;
    const token = req.cookies['access_token'];
    let user = '';
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findOne({ email: decoded.email });
    }
    const question = (
      await Board.create({
        title,
        content,
        category,
        thumbnail,
        author: user._id,
        createdAt: getCurrentTime(),
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
    const token = req.cookies['access_token'];
    let user = '';
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findOne({ email: decoded.email });
    }
    res.send({ question, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/question/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Board.findOneAndDelete({ _id: id });
    const comments = result.comment;
    for (let comment of comments) {
      await Comment.findOneAndDelete({ _id: comment });
    }
    res.send(result);
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
    let user = '';
    const token = req.cookies['access_token'];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findOne({ email: decoded.email });
    }
    res.send({ question, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
