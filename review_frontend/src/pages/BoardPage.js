import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import BoardContainer from '../containers/board/BoardContainer';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

const BoardPage = () => {
  return (
    <div>
      <HeaderContainer />
      <BoardContainer />
      <Footer />
    </div>
  );
};

export default BoardPage;
