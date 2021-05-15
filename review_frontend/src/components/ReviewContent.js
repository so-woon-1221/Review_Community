import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentWrapper = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  //height: 300px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  text-decoration: none;
  color: black;
  &:last-child {
    border-bottom: none;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const ContentImage = styled.div`
  width: 40%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const ContentDescription = styled.div`
  width: 50%;
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
      <ContentImage>
        <img src={review.thumbnail} alt={review.title} />
      </ContentImage>
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
