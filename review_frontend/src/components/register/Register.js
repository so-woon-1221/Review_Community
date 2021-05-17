import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const RegisterBlock = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const RegisterWrapper = styled.div`
  text-align: center;
  font-size: 20px;
  padding-top: 70px;
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
  }

  button {
    border: none;
    background: #171c26;
    color: #a7c0f2;
    padding: 15px;
    width: 400px;
    margin: 0 auto 20px;
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

const MessageBlock = styled.div`
  height: 70px;
  padding-top: 20px;
  box-sizing: border-box;
  width: 400px;
  text-align: left;
  padding-left: 100px;
  margin: auto;
`;

const Register = ({
  email,
  password,
  name,
  onChange,
  onSubmit,
  onCheckEmail,
  onCheckName,
  checkEmail,
  checkName,
}) => {
  const [check, setCheck] = useState('');
  const checkDiv = useRef(null);
  const onChangeEmail = (e) => {
    const email = e.target.value;
    onChange({ key: 'email', value: email });
    onCheckEmail({ email });
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    onChange({ key: 'password', value: password });
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    onChange({ key: 'name', value: name });
    onCheckName({ name });
  };

  const passwordCheck = (e) => {
    if (password !== e.target.value) {
      setCheck('비밀번호가 다릅니다.');
      checkDiv.current.style.color = 'black';
    } else {
      setCheck('비밀번호가 같습니다.');
      checkDiv.current.style.color = 'white';
    }
  };
  return (
    <RegisterBlock>
      <RegisterWrapper>
        <div>
          <label for={'email'}>이메일</label>
          <input
            type={'text'}
            value={email}
            onChange={onChangeEmail}
            id={'email'}
          />
          <MessageBlock>{checkEmail}</MessageBlock>
        </div>
        <div>
          <label htmlFor={'password'}>비밀번호</label>
          <input
            type={'password'}
            value={password}
            onChange={onChangePassword}
            id={'password'}
          />
          <MessageBlock />
        </div>
        <div>
          <label htmlFor={'password_check'}>재입력</label>
          <input
            type={'password'}
            onChange={passwordCheck}
            id={'password_check'}
          />
          <MessageBlock ref={checkDiv}>{check}</MessageBlock>
        </div>
        <div>
          <label htmlFor={'nick'}>닉네임</label>
          <input
            type={'text'}
            value={name}
            onChange={onChangeName}
            id={'nick'}
          />
          <MessageBlock>{checkName}</MessageBlock>
        </div>
        <button onClick={onSubmit}>회원가입</button>
      </RegisterWrapper>
    </RegisterBlock>
  );
};

export default Register;
