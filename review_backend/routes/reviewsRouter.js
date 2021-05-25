const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let { category, sort, author, search, page } = req.query;
  console.log(req.query);
  let reviews = '';
  let filter = {};
  let sorted = {};
  let name = '';
  if (!page) {
    page = 1;
  }
  try {
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (sort === 'recommend') {
      sorted.recommend = -1;
      sorted.createdAt = -1;
    }
    if (sort === 'latest') {
      sorted.createdAt = -1;
    }
    if (search) {
      const exUser = await User.findOne({ name: search });
      if (exUser) {
        filter.author = exUser._id;
      } else {
        filter.$text = { $search: search };
      }
    }
    if (author) {
      filter.author = author;
      name = await User.findOne({ _id: author });
    }
    const count = await Review.find(filter).count();
    if (count > 0) {
      reviews = await Review.find(filter)
        .populate('author')
        .sort(sorted)
        .limit(10)
        .skip((page - 1) * 10);
    } else {
      reviews = '검색 결과 없음';
    }
    const token = req.cookies['access_token'];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      return res.send({ reviews, user, name, count });
    }
    return res.send({ reviews, name, count });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
