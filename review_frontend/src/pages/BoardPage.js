import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import { Link } from 'react-router-dom';

const BoardPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Link to={'/board/question'}>질문하기</Link>
    </div>
  );
};

export default BoardPage;
