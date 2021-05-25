import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const FooterBlock = styled.div`
  border-top: 1px solid #dddddd;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  //line-height: 4;
  div {
    width: 100%;
    text-align: center;
  }
  svg {
    margin-right: 5px;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div>
        <FontAwesomeIcon icon={faCopyright} />
        Made by Sowoon
      </div>
    </FooterBlock>
  );
};

export default Footer;
