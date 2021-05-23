import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import QuestionViewContainer from '../containers/board/QuestionViewContainer';
import Footer from '../components/common/Footer';

const QuestionViewPage = () => {
  return (
    <div>
      <HeaderContainer />
      <QuestionViewContainer />
      <Footer />
    </div>
  );
};

export default QuestionViewPage;
