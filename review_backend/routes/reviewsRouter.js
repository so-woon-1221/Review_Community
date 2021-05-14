const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

// const paging = (page, totalPost) => {
//   const maxPost = 10;
//   let currentPage = page ? parseInt(page) : 1;
//   const hidePost = page === 1 ? 0 : (page - 1) * maxPost;
//   const totalPage = Math.ceil(totalPost / maxPost);
//
//   if (currentPage > totalPage) {
//     currentPage = totalPage;
//   }
//
//   const startPage = 1;
//   const endPage = totalPage;
//
//   return {
//     startPage,
//     endPage,
//     hidePost,
//     maxPost,
//     totalPage,
//     currentPage,
//   };
// };

router.get('/', isLoggedIn, async (req, res, next) => {
  // const { page } = req.query;
  // try {
  //   const totalPost = await Review.countDocuments({});
  //   const {
  //     startPage,
  //     endPage,
  //     hidePost,
  //     maxPost,
  //     totalPage,
  //     currentPage,
  //   } = paging(page, totalPost);
  //   const reviews = await Review.find({})
  //     .sort({ recommend: -1 })
  //     .skip(hidePost)
  //     .limit(maxPost);
  //   res.send(reviews);
  // } catch (e) {
  //   console.error(e);
  //   next(e);
  // }

  try {
    const reviews = await Review.find({})
      .populate('author')
      .sort({ recommend: -1 });
    const token = req.cookies['access_token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    // console.log(user);
    res.send({ reviews, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('author');
    // console.log(review);
    res.send(review);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/recommend', async (req, res, next) => {
  try {
    const recommend = req.body.recommend;
    const number = req.body.number;
    const newReview = await Review.findOneAndUpdate(
      { _id: req.params.id },
      { recommend: +recommend + number },
      { new: true },
    );
    res.send(newReview);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
