import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewContent from '../../components/review/ReviewContent';
// import { useDispatch, useSelector } from 'react-redux';
// import { get } from '../modules/review';

const ContentBlock = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-wrap: wrap;

  h2 {
    margin: 0 0 10px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const HotReviewContainer = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/index')
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReviews(result.reviews);
        if (result.user) {
          localStorage.setItem('user', result.user._id);
        }
      });
  }, []);

  return (
    <ContentBlock>
      <div>
        <h2>현재 인기 리뷰!</h2>
      </div>
      {reviews &&
        reviews.map((review) => (
          <ReviewContent review={review} key={review._id} />
        ))}
    </ContentBlock>
  );
};

export default HotReviewContainer;
