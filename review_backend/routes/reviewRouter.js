const express = require('express');
const Review = require('../schemas/review');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (e) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post('/image', upload.single('image'), (req, res, next) => {
  try {
    res.send(`/img/${req.file.filename}`);
    console.log(req.file);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Review.findOneAndDelete({ _id: req.params.id });
    res.send(result);
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

router.patch('/:id', async (req, res, next) => {
  try {
    const { title, subtitle, content, thumbnail, category } = req.body;
    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title,
        subtitle,
        content,
        thumbnail,
        category,
      },
      { new: true },
    ).populate('author');
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
