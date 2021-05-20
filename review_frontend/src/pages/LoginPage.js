import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LoginContainer from '../containers/login/LoginContainer';
import Footer from '../components/common/Footer';

const LoginPage = () => {
  return (
    <div>
      <HeaderContainer />
      <LoginContainer />
      <Footer />
    </div>
  );
};

export default LoginPage;
