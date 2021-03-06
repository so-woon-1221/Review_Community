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
  padding: 0 15% 20px;

  @media screen and (max-width: 768px) {
    padding: 0 5% 20px;
  }
`;

const ButtonBlock = styled.div`
  border-top: 1px solid #dddddd;
  padding-top: 10px;
  margin-top: 20px;

  button {
    background: none;
    border: none;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    &:first-child:hover {
      color: #a7c0f2;
    }
    &:first-child {
      padding: 10px 20px 10px 0;
    }

    &:nth-child(2):hover {
      color: red;
    }
  }
`;

const ReviewHeader = styled.div`
  text-align: center;
  position: relative;
  background: no-repeat center center;
  background-size: cover;
  transform: translateY(-25px);
  box-sizing: border-box;
  color: white;

  width: 100%;
  height: 550px;
  padding-top: 100px;

  h1 {
    font-size: 50px;
    //font-weight: bolder;
  }
  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 20px;
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
    //align-items: center;
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

  @media screen and (max-width: 768px) {
    height: 350px;
    padding-top: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Review = ({
  review,
  onClickUp,
  onClickDown,
  user,
  onDelete,
  onClickAuthor,
}) => {
  const {
    title,
    subtitle,
    content,
    thumbnail,
    recommend,
    _id,
    category,
  } = review;
  const [nowCategory, setNowCategory] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [loginUser, setLoginUser] = useState(user);
  const header = useRef(null);

  useEffect(() => {
    if (review.author) {
      setName(review.author.name);
      header.current.style.backgroundImage = `url(${thumbnail})`;
      setAuthor(review.author._id);
    }
    if (user._id) {
      setLoginUser(user._id);
    }
    switch (category) {
      case 'tech':
        setNowCategory('??????');
        break;
      case 'food':
        setNowCategory('??????');
        break;
      case 'cafe':
        setNowCategory('??????');
        break;
      case 'game':
        setNowCategory('??????');
        break;
      case 'fashion':
        setNowCategory('??????');
        break;
    }
  }, [category, review, thumbnail, user._id]);

  const bodyContent = useRef(null);

  useEffect(() => {
    if (
      bodyContent.current.clientHeight <= document.documentElement.clientHeight
    ) {
      bodyContent.current.style.minHeight =
        document.documentElement.clientHeight - 170 + 'px';
    }
  }, []);

  return (
    <div ref={bodyContent}>
      <ReviewHeader ref={header}>
        <div />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <h3>
          by{' '}
          <i>
            <StyledLink to={`/reviews?author=${author}`}>{name}</StyledLink>
          </i>
        </h3>
        <h3># {nowCategory}</h3>
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
    </div>
  );
};

export default Review;
