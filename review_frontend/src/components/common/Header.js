import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  background: #171c26;
  color: white;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 15%;
  z-index: 9999;

  @media screen and (max-width: 768px) {
    padding: 0 5%;
    display: block;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  button {
    display: none;
    background: none;
    color: white;
    border: none;
    font-size: 20px;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    display: none;
    height: 0;
    transition: all 1s ease;
    //flex-wrap: nowrap;
    &.open {
      display: flex;
      height: auto;
    }
  }
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

  &.logo {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    padding-right: 15px;
  }
`;

const Header = ({ user }) => {
  const menuButton = useRef(null);
  const menu = useRef(null);

  const onClick = () => {
    menu.current.classList.toggle('open');
  };

  return (
    <HeaderBlock>
      <HeaderLogo>
        <HeaderLink to={'/'} className={'logo'}>
          <h1>REVIEWERS</h1>
        </HeaderLink>
        <button ref={menuButton} onClick={onClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </HeaderLogo>
      <HeaderContent ref={menu}>
        <HeaderLink to={'/'}>
          <h3>HOME</h3>
        </HeaderLink>
        <HeaderLink to={'/reviews'}>
          <h3>REVIEWS</h3>
        </HeaderLink>
        <HeaderLink to={'/board'}>
          <h3>BOARD</h3>
        </HeaderLink>
        {user === '' ? (
          <HeaderLink to={'/login'}>
            <h3>LOGIN</h3>
          </HeaderLink>
        ) : (
          <HeaderLink to={'/logout'}>
            <h3>LOGOUT</h3>
          </HeaderLink>
        )}
      </HeaderContent>
    </HeaderBlock>
  );
};

export default Header;
