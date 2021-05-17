const express = require('express');
const Board = require('../schemas/board');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const question = (
      await Board.create({
        title,
        content,
        author,
      })
    ).populate('author');
    res.send(question);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
