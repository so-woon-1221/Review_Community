import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginBlock = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const LoginWrapper = styled.div`
  text-align: center;
  font-size: 20px;
  label {
    text-align: left;
    display: inline-block;
    width: 100px;
    margin: 0 auto;
  }

  input {
    border: none;
    width: 300px;
    border-bottom: 1px solid #dddddd;
    font-size: 20px;
    margin-top: 70px;
  }

  button {
    border: none;
    background: #171c26;
    color: #a7c0f2;
    padding: 15px;
    width: 400px;
    margin: 70px auto 20px;
    display: block;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background: #a7c0f2;
      color: black;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  border: none;
  background: #171c26;
  color: #a7c0f2;
  padding: 15px 0;
  width: 400px;
  margin: 0 auto 30px;
  display: block;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #a7c0f2;
    color: black;
  }
`;

const Login = ({ email, password, onChangeField, onSubmit }) => {
  const onChangeEmail = (e) => {
    onChangeField({ key: 'email', value: e.target.value });
  };

  const onChangePassword = (e) => {
    onChangeField({ key: 'password', value: e.target.value });
  };

  return (
    <LoginBlock>
      <LoginWrapper>
        <div>
          <label for={'email'}>이메일</label>
          <input
            type={'text'}
            value={email}
            onChange={onChangeEmail}
            id={'email'}
          />
        </div>
        <div>
          <label for={'password'}>비밀번호</label>
          <input
            type={'password'}
            value={password}
            id={'password'}
            onChange={onChangePassword}
          />
        </div>
        <button onClick={onSubmit}>로그인</button>
        <StyledLink to={'/register'}>회원가입</StyledLink>
      </LoginWrapper>
    </LoginBlock>
  );
};

export default Login;
