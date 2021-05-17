import React, { useCallback, useEffect } from 'react';
import Login from '../../components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, loginUser, clearUser } from '../../modules/login';
import { withRouter } from 'react-router-dom';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { email, password, user, error } = useSelector(({ login }) => ({
    email: login.email,
    password: login.password,
    user: login.user,
    error: login.error,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onSubmit = () => {
    if (email === '' || password === '') {
      alert('빈칸입니다.');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user.message) {
      alert(user.message);
      dispatch(clearUser());
      return;
    }
    if (user) {
      alert('로그인되었습니다.');
      history.goBack();
      try {
        // localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user', user._id);
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
    if (error != null) {
      alert(error);
    }
  }, [history, user, error, dispatch]);

  return (
    <Login
      email={email}
      password={password}
      onChangeField={onChangeField}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(LoginContainer);
