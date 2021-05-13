import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterBlock = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const RegisterWrapper = styled.div`
  text-align: center;
`;

const Register = ({ email, password, name, onChange, onSubmit }) => {
  const [check, setCheck] = useState('');
  const onChangeEmail = (e) => {
    onChange({ key: 'email', value: e.target.value });
  };

  const onChangePassword = (e) => {
    onChange({ key: 'password', value: e.target.value });
  };

  const onChangeName = (e) => {
    onChange({ key: 'name', value: e.target.value });
  };

  const passwordCheck = (e) => {
    if (password !== e.target.value) {
      setCheck('비밀번호가 다릅니다.');
    } else {
      setCheck('');
    }
  };
  return (
    <RegisterBlock>
      <RegisterWrapper>
        <input
          type={'text'}
          value={email}
          onChange={onChangeEmail}
          placeholder={'email'}
        />
        <br />
        <input
          type={'password'}
          value={password}
          onChange={onChangePassword}
          placeholder={'password'}
        />
        <br />
        <input
          type={'password'}
          onChange={passwordCheck}
          placeholder={'password'}
        />
        <br />
        <div>{check}</div>
        <br />
        <input
          type={'text'}
          value={name}
          onChange={onChangeName}
          placeholder={'name'}
        />
        <br />
        <button onClick={onSubmit}>회원가입</button>
      </RegisterWrapper>
    </RegisterBlock>
  );
};

export default Register;
