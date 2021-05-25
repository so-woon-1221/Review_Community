const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

router.get('/index', async (req, res, next) => {
  let reviews = '';
  let { limit } = req.query;
  if (!limit) {
    limit = 10;
  }
  try {
    reviews = await Review.find({})
      .populate('author')
      .sort({ recommend: -1 })
      .limit(+limit);
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

module.exports = router;
