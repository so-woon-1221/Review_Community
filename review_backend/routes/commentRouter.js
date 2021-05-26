const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');
const Board = require('../schemas/board');
const { isLoggedIn } = require('../routes/jwtMiddleware');
const getCurrentTime = require('../public/getCurrentTime');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  const content = req.body.content;
  const token = req.cookies['access_token'];
  let user = '';
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findOne({ email: decoded.email });
  }
  try {
    const newComment = await Comment.create({
      comment: content,
      author: user._id,
      authorName: user.name,
      createdAt: getCurrentTime(),
    });
    res.send(newComment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Comment.findOneAndDelete({ _id: id });
    const question = await Board.findOne({ comment: id });
    const comments = question.comment.slice();
    const index = comments.indexOf(id);
    comments.splice(index, 1);
    const newQuestion = await Board.findOneAndUpdate(
      { _id: question._id },
      { comment: comments },
      { new: true },
    );
    res.send(newQuestion);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
