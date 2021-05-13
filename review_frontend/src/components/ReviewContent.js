import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  height: 300px;
  display: flex;
  border-bottom: 1px solid #dddddd;
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

  p {
    margin: 0 0 10px;
  }
`;

const ReviewContent = ({ review }) => {
  return (
    <ContentWrapper key={review._id}>
      {/*<img src={review.thumbnail} />*/}
      <ContentDescription>
        <h2>{review.title}</h2>
        <h3>
          {review.subtitle} by {review.subtitle}
        </h3>
        <p>{review.content}</p>
      </ContentDescription>
    </ContentWrapper>
  );
};

export default ReviewContent;
