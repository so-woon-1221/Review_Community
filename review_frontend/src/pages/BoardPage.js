import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

const BoardPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Link to={'/board/question'}>질문하기</Link>
      <Footer />
    </div>
  );
};

export default BoardPage;
