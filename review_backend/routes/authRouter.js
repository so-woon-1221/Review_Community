const express = require('express');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./jwtMiddleware');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.send({ message: '이미 존재하는 회원입니다.' });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hash,
      name,
    });
    const data = user.toJSON();
    delete data.password;
    return res.send(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/join/check/email', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email } = req.body;
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.send({ message: '이미 존재하는 회원입니다.' });
    }
    return res.send({ message: '사용할 수 있습니다.' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/join/check/name', isNotLoggedIn, async (req, res, next) => {
  try {
    const { name } = req.body;
    const exUser = await User.findOne({ name });
    if (exUser) {
      return res.send({ message: '이미 존재하는 닉네임입니다.' });
    }
    return res.send({ message: '사용할 수 있습니다.' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError) {
        console.error(passportError);
        return next(passportError);
      }
      if (!user) {
        return res.send({ message: info.message });
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          console.error(loginError);
          next(loginError);
        }
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
        );
        res.cookie('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        const data = user.toJSON();
        delete data.password;
        return res.send(data);
      });
    })(req, res, next);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('access_token');
  res.send({ message: '로그아웃 되었습니다.' });
});

module.exports = router;
