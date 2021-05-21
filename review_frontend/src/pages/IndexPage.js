import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import HotReviewContainer from '../containers/review/HotReviewContainer';
import Footer from '../components/common/Footer';

const IndexPage = () => {
  return (
    <div>
      <HeaderContainer />
      <HotReviewContainer />
      <Footer />
    </div>
  );
};

export default IndexPage;
