import React, { useCallback, useEffect } from 'react';
import Login from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, loginUser } from '../modules/login';
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
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      alert('로그인되었습니다.');
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
    if (error != null) {
      alert(error);
    }
    return () => {};
  }, [history, user, error]);

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
