const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies['access_token'];
  if (!token) {
    res.send({ message: '로그인필요' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findOne({ email: decoded.email });
      if (user) {
        next();
      }
    } catch (e) {
      res.status(403).send('로그인 정보 없음');
    }
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  const token = req.cookies['access_token'];
  if (!token) {
    next();
  } else {
    res.status(403).send('로그인한 상태입니다.');
  }
};
