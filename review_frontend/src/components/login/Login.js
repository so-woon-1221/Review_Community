import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginBlock = styled.div`
  padding: 100px 15%;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 80px 5%;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  font-size: 16px;
  div {
    text-align: left;
    width: 70%;
    padding: 0 15%;
    display: flex;
    align-items: center;
    margin-bottom: 70px;
  }
  input {
    flex: 1;
    height: 40px;
    border: none;
    border-bottom: 1px solid #dddddd;
  }
  label {
    margin-right: 5%;
    width: 20%;
  }

  @media screen and (max-width: 768px) {
    div {
      width: 100%;
      padding: 0;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: none;
  background: #171c26;
  color: #a7c0f2;
  padding: 20px 0;
  width: 70%;
  display: block;
  margin: 0 15%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #a7c0f2;
    color: black;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const LoginButton = styled.button`
  background: black;
  color: #a7c0f2;
  border: none;
  border-radius: 5px;
  width: 70%;
  padding: 20px 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 40px;
  &:hover {
    background: #a7c0f2;
    color: black;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
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
      </LoginWrapper>
      <LoginButton onClick={onSubmit}>로그인</LoginButton>
      <StyledLink to={'/register'}>회원가입</StyledLink>
    </LoginBlock>
  );
};

export default Login;
