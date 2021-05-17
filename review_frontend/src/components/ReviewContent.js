import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentWrapper = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 10px 0;
  min-height: 250px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #dddddd;
  text-decoration: none;
  color: black;
  &:last-child {
    border-bottom: none;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 0;
  }
`;

const ContentImage = styled.div`
  min-width: 40%;
  min-height: 230px;
  overflow: hidden;

  background: no-repeat center center;
  background-size: cover;
  background-attachment: scroll;

  //img {
  //  height: 100%;
  //  width: auto;
  //}
  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

const ContentDescription = styled.div`
  //width: 60%;
  padding-left: 20px;

  h2 {
    margin: 0 0 10px;
  }

  h3 {
    margin: 0 0 10px;
    color: #262626;
  }

  h5 {
    margin: 10px 0 15px;
  }

  span {
    margin: 0 0 10px;
    background: #171c26;
    color: #a7c0f2;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;

    &:before {
      content: '# ';
    }
  }
`;

const ReviewContent = ({ review }) => {
  const [category, setCategory] = useState('');
  const thumbnail = useRef(null);
  useEffect(() => {
    switch (review.category) {
      case 'tech':
        setCategory('테크');
        break;
      case 'food':
        setCategory('맛집');
        break;
      case 'cafe':
        setCategory('카페');
        break;
      case 'game':
        setCategory('게임');
        break;
    }
    if (review.thumbnail) {
      thumbnail.current.style.backgroundImage = `url(${review.thumbnail})`;
    }
  }, [review.category, review.thumbnail]);
  return (
    <ContentWrapper key={review._id} to={`/reviews/${review._id}`}>
      <ContentImage ref={thumbnail}>
        {/*<img src={review.thumbnail} alt={review.title} />*/}
      </ContentImage>
      <ContentDescription>
        <h2>{review.title}</h2>
        <h3>
          {review.subtitle}
          <br />
          <h5>
            by <i>{review.author.name}</i>
          </h5>
        </h3>
        <span>{category}</span>
      </ContentDescription>
    </ContentWrapper>
  );
};

export default ReviewContent;
