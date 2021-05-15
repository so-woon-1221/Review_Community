const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

router.get('/index', async (req, res, next) => {
  let reviews = '';
  try {
    reviews = await Review.find({}).populate('author').sort({ recommend: -1 });
    const token = req.cookies['access_token'];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      return res.send({ reviews, user });
    }
    return res.send({ reviews });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/review', isLoggedIn, async (req, res, next) => {
  try {
    const review = await Review.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      thumbnail: req.body.thumbnail,
      category: req.body.category,
      author: req.body.author,
    });
    res.send(review);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
