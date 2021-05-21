import React from 'react';
import HeaderContainer from '../../containers/HeaderContainer';
import ReviewContainer from '../../containers/review/ReviewContainer';
import Footer from '../../components/common/Footer';

const ReviewPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ReviewContainer />
      <Footer />
    </div>
  );
};

export default ReviewPage;
