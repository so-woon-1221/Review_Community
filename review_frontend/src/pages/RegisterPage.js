import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import RegisterContainer from '../containers/register/RegisterContainer';
import Footer from '../components/common/Footer';

const RegisterPage = () => {
  return (
    <div>
      <HeaderContainer />
      <RegisterContainer />
      <Footer />
    </div>
  );
};

export default RegisterPage;
