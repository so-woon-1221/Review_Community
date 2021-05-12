const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../schemas/user');

const passportConfig = {
  usernameField: 'email',
  passwordField: 'password',
};

const passportVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        done(null, user);
      } else {
        done(null, false, { message: '비밀번호 일치하지 않습니다' });
      }
    } else {
      done(null, false, { message: '가입되지 않은 회원입니다.' });
    }
  } catch (e) {
    console.error(e);
    done(e);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};
