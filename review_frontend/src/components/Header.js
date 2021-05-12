import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  background: #171c26;
  color: white;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 15%;

  @media screen and (max-width: 768px) {
    padding: 0 5%;
    display: block;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding-right: 30px;
  &:hover {
    text-decoration: underline;
  }

  h1 {
    color: #a7c0f2;
  }
  color: white;
  &:last-child {
    padding-right: 0;
  }
`;

const Header = ({ user }) => {
  return (
    <HeaderBlock>
      <HeaderLogo>
        <HeaderLink to={'/'}>
          <h1>REVIEWS</h1>
        </HeaderLink>
      </HeaderLogo>
      <HeaderContent>
        <HeaderLink to={'/'}>
          <h3>Home</h3>
        </HeaderLink>
        <HeaderLink to={'/reviews'}>
          <h3>REVIEWS</h3>
        </HeaderLink>
        <HeaderLink to={'/board'}>
          <h3>Q&A</h3>
        </HeaderLink>
        {user === '' ? (
          <HeaderLink to={'/login'}>
            <h3>Login</h3>
          </HeaderLink>
        ) : (
          <HeaderLink>
            <h3>Logout</h3>
          </HeaderLink>
        )}
      </HeaderContent>
    </HeaderBlock>
  );
};

export default Header;
