import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeField,
  registerUser,
  initialize,
  checkEmail,
  checkName,
} from '../../modules/register';
import Register from '../../components/register/Register';
import { withRouter } from 'react-router-dom';

const RegisterContainer = ({ history }) => {
  const {
    email,
    password,
    name,
    user,
    error,
    nameCheck,
    emailCheck,
  } = useSelector(({ register }) => ({
    email: register.email,
    password: register.password,
    name: register.name,
    user: register.user,
    emailCheck: register.checkEmail,
    nameCheck: register.checkName,
    error: register.error,
  }));

  const dispatch = useDispatch();
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onSubmit = () => {
    let errorMessage = '';
    if (email === '') {
      errorMessage += '[이메일] ';
    }
    if (password === '') {
      errorMessage += '[비밀번호] ';
    }
    if (name === '') {
      errorMessage += '[닉네임] ';
    }
    if (errorMessage !== '') {
      errorMessage += '빈칸입니다.';
      alert(errorMessage);
      return;
    }
    dispatch(registerUser({ email, name, password }));
  };

  const onCheckEmail = useCallback((email) => dispatch(checkEmail(email)), [
    dispatch,
  ]);

  const onCheckName = useCallback((name) => dispatch(checkName(name)), [
    dispatch,
  ]);

  useEffect(() => {
    if (user.message) {
      alert(user.message);
      return;
    }
    if (user) {
      alert('회원가입되었습니다');
      history.push('/login');
    }
    return () => {
      dispatch(initialize());
    };
  }, [history, user, dispatch]);

  return (
    <Register
      email={email}
      name={name}
      password={password}
      onChange={onChangeField}
      onSubmit={onSubmit}
      checkEmail={emailCheck}
      checkName={nameCheck}
      onCheckEmail={onCheckEmail}
      onCheckName={onCheckName}
    />
  );
};

export default withRouter(RegisterContainer);
