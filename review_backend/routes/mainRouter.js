const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');

const router = express.Router();

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
