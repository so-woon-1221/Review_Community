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

router.get('/', async (req, res, next) => {
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

  // const { category } = req.query ? req.query : 'all';
  const { category, sort } = req.query;
  console.log(req.query);
  let reviews = '';
  let filter = {};
  let sorted = {};
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
    reviews = await Review.find(filter).populate('author').sort(sorted);
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

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Review.findOneAndDelete({ _id: req.params.id });
    res.send(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
