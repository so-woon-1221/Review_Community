const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');
const { isLoggedIn } = require('../routes/jwtMiddleware');

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
    });
    res.send(newComment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
