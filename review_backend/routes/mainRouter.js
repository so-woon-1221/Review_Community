const express = require('express');
const Post = require('../schemas/post');

const router = express.Router();

router.post('/post', async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      // title: 'gg',
    });
    res.send(post);
    // console.log(req.body);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
