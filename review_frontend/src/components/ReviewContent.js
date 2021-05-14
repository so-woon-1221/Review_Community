import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentWrapper = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  height: 300px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  text-decoration: none;
  color: black;
  &:last-child {
    border-bottom: none;
  }
  img {
    max-width: 50%;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const ContentDescription = styled.div`
  width: 70%;
  padding-left: 20px;

  h2 {
    margin: 0 0 10px;
  }

  h3 {
    margin: 0 0 10px;
  }

  span {
    margin: 0 0 10px;
    background: #eeeeee;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
  }
`;

const ReviewContent = ({ review }) => {
  return (
    <ContentWrapper key={review._id} to={`/reviews/${review._id}`}>
      <img src={review.thumbnail} />
      <ContentDescription>
        <h2>{review.title}</h2>
        <h3>
          {review.subtitle} by <i>{review.author.name}</i>
        </h3>
        <span>{review.category}</span>
      </ContentDescription>
    </ContentWrapper>
  );
};

export default ReviewContent;
