import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Viewer } from '@toast-ui/react-editor';

import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const ReviewBlock = styled.div`
  padding: 0 15%;
`;

const ButtonBlock = styled.div`
  border-top: 1px solid #dddddd;
  padding-top: 10px;

  button {
    background: none;
    border: none;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: red;
    }

    &:first-child {
      padding: 10px 20px 10px 0;
    }
  }
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

const Review = ({ review, onClickUp, onClickDown, user, onDelete }) => {
  const { title, subtitle, content, thumbnail, recommend, _id } = review;
  const [name, setName] = useState('');
  const [loginUser, setLoginUser] = useState(user);
  const header = useRef(null);

  useEffect(() => {
    if (review.author) {
      setName(review.author.name);
      header.current.style.backgroundImage = `url(${thumbnail})`;
    }
    if (user._id) {
      setLoginUser(user._id);
    }
  }, [review, thumbnail, user._id]);

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
      <ReviewBlock>
        {content && <Viewer initialValue={content} />}
        {review.author && loginUser === review.author._id && (
          <ButtonBlock>
            <Link to={`/review/${_id}`}>
              <button>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </Link>
            <button onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </ButtonBlock>
        )}
      </ReviewBlock>
    </>
  );
};

export default Review;
