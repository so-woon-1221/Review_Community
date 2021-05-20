import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import ReviewListContainer from '../containers/ReviewListContainer';
import Footer from '../components/common/Footer';

const ReviewListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ReviewListContainer />
      <Footer />
    </div>
  );
};

export default ReviewListPage;
