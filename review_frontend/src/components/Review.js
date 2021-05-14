import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

const ReviewBlock = styled.div`
  padding: 20px 15%;
`;

const ReviewHeader = styled.div`
  text-align: center;
  position: relative;
  background: no-repeat center center;
  background-size: cover;
  background-attachment: scroll;
  transform: translateY(-25px);
  box-sizing: border-box;
  color: white;

  width: 100%;
  height: 550px;
  padding-top: 150px;

  h1 {
    font-size: 50px;
    //font-weight: bolder;
  }
  h2 {
    font-size: 30px;
  }
  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000000;
    opacity: 0.6;
    z-index: -1;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  button {
    background: none;
    border: none;
    color: white;
    margin: 0 20px;
    padding: 0;
    cursor: pointer;
  }
`;

const Review = ({ review, onClickUp, onClickDown }) => {
  const { title, subtitle, content, thumbnail, recommend } = review;
  const [name, setName] = useState('');
  const header = useRef(null);

  useEffect(() => {
    if (review.author) {
      setName(review.author.name);
      header.current.style.backgroundImage = `url(${thumbnail})`;
    }
  }, [review, thumbnail]);

  return (
    <>
      <ReviewHeader ref={header}>
        <div />
        <h1>{title}</h1>
        <h2>
          {subtitle} by <i>{name}</i>
        </h2>
        <p>
          <button onClick={onClickUp}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>{' '}
          {recommend}
          <button onClick={onClickDown}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>{' '}
        </p>
      </ReviewHeader>
      <ReviewBlock dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default Review;
