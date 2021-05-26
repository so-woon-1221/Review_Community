const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

router.get('/index', async (req, res, next) => {
  let reviews = '';
  let { limit, term } = req.query;
  let filter = {};
  if (!limit) {
    limit = 10;
  }
  if (term === 'today') {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    filter.createdAt = { $gte: new Date(year, month, date, -15, 0, 0, 0) };
  } else if (term === '3day') {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate() - 3;
    filter.createdAt = { $gte: new Date(year, month, date, -15, 0, 0, 0) };
  } else if (term === 'week') {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate() - 7;
    filter.createdAt = { $gte: new Date(year, month, date, -15, 0, 0, 0) };
  } else if (term === 'month') {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() - 1;
    const date = today.getDate();
    filter.createdAt = { $gte: new Date(year, month, date, -15, 0, 0, 0) };
  }
  try {
    reviews = await Review.find(filter)
      .populate('author')
      .sort({ recommend: -1, createdAt: -1, title: -1 })
      .limit(+limit);
    const count = await Review.find(filter).count();
    const token = req.cookies['access_token'];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      return res.send({ reviews, user, count });
    }
    return res.send({ reviews, count });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
