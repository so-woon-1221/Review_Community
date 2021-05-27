import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const RegisterBlock = styled.div`
  padding: 100px 15%;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 80px 5%;
  }

  font-size: 16px;
  button {
    font-size: 16px;
  }
  input {
    font-size: 16px;
  }
`;

const RegisterWrapper = styled.div`
  width: 100%;
`;

const InputBlock = styled.div`
  text-align: left;
  width: 70%;
  display: flex;
  padding: 0 15%;
  align-items: center;
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
  button {
    margin-left: 5%;
    width: 15%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background: black;
    color: #a7c0f2;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const MessageBlock = styled.div`
  height: 70px;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: left;
  margin-left: 32.5%;
`;

const RegisterButton = styled.button`
  background: black;
  color: #a7c0f2;
  border: none;
  border-radius: 5px;
  width: 70%;
  padding: 20px 10px;
  cursor: pointer;
  &:hover {
    background: #a7c0f2;
    color: black;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
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
  const [emailMessage, setEmailMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const onChangeEmail = (e) => {
    const email = e.target.value;
    onChange({ key: 'email', value: email });
    if (email.indexOf('@') < 0 || email.indexOf('.com') < 0) {
      setEmailMessage('올바른 이메일 형식을 입력하세요');
    } else {
      setEmailMessage('');
    }
    onCheckEmail({ email });
  };

  const onClickCheckEmail = () => {
    if (email === '') {
      alert('이메일을 입력하세요');
      return;
    }
    if (email.indexOf('@') < 0 || email.indexOf('.com') < 0) {
      alert('올바른 이메일 형식을 입력하세요');
      return;
    }
    alert(checkEmail);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    onChange({ key: 'password', value: password });
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    onChange({ key: 'name', value: name });
    if (name.length <= 1) {
      setNameMessage('닉네임은 최소 2글자입니다.');
    } else {
      setNameMessage('');
    }
    onCheckName({ name });
  };

  const onClickCheckName = () => {
    alert(checkName);
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
        <InputBlock>
          <label htmlFor={'email'}>이메일</label>
          <input
            type={'text'}
            value={email}
            onChange={onChangeEmail}
            id={'email'}
          />
          <button onClick={onClickCheckEmail}>확인</button>
        </InputBlock>
        <MessageBlock>{emailMessage}</MessageBlock>
      </RegisterWrapper>
      <RegisterWrapper>
        <InputBlock>
          <label htmlFor={'password'}>비밀번호</label>
          <input
            type={'password'}
            value={password}
            onChange={onChangePassword}
            id={'password'}
          />
        </InputBlock>
        <MessageBlock />
      </RegisterWrapper>
      <RegisterWrapper>
        <InputBlock>
          <label htmlFor={'password_check'}>비밀번호 확인</label>
          <input
            type={'password'}
            onChange={passwordCheck}
            id={'password_check'}
            // placeholder={'비밀번호 확인'}
          />
        </InputBlock>
        <MessageBlock ref={checkDiv}>{check}</MessageBlock>
      </RegisterWrapper>
      <RegisterWrapper>
        <InputBlock>
          <label htmlFor={'nick'}>닉네임</label>
          <input
            type={'text'}
            value={name}
            onChange={onChangeName}
            id={'nick'}
            // placeholder={'닉네임'}
          />
          <button onClick={onClickCheckName}>확인</button>
        </InputBlock>
        <MessageBlock>{nameMessage}</MessageBlock>
      </RegisterWrapper>
      <RegisterButton onClick={onSubmit}>회원가입</RegisterButton>
    </RegisterBlock>
  );
};

export default Register;
