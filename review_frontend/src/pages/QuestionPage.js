import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../components/common/Footer';
import QuestionContainer from '../containers/board/QuestionContainer';

const QuestionPage = () => {
  return (
    <div>
      <HeaderContainer />
      <QuestionContainer />
      <Footer />
    </div>
  );
};

export default QuestionPage;
