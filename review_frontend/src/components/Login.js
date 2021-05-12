import React from 'react';
import styled from 'styled-components';

const LoginBlock = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const LoginWrapper = styled.div`
  text-align: center;
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
        <input
          type={'text'}
          value={email}
          placeholder={'메일을 입력하세요'}
          onChange={onChangeEmail}
        />
        <input
          type={'text'}
          value={password}
          placeholder={'비밀번호'}
          onChange={onChangePassword}
        />
        <button onClick={onSubmit}>로그인</button>
      </LoginWrapper>
    </LoginBlock>
  );
};

export default Login;
