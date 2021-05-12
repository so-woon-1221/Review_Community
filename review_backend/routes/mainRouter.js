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
      // author: req.user.id
    });
    res.send(review);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

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

router.get('/reviews', async (req, res, next) => {
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
    const reviews = await Review.find({}).sort({ recommend: -1 });
    console.log(reviews);
    res.send(reviews);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
