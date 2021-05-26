import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReviewContent from '../../components/review/ReviewContent';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setValues, getHotReview, initialize } from '../../modules/hotReview';

const ContentBlock = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-wrap: wrap;

  div:first-child {
    display: flex;
    align-items: center;

    select {
      margin-left: 20px;
      border: none;
    }
  }

  h2 {
    margin: 0 0 10px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const HotReviewContainer = () => {
  const { reviews, term } = useSelector(({ hotReview }) => ({
    reviews: hotReview.reviews,
    term: hotReview.term,
  }));
  const dispatch = useDispatch();
  const terms = [
    { id: 0, text: '1달', value: 'month' },
    { id: 1, text: '1주일', value: 'week' },
    { id: 2, text: '3일', value: '3day' },
    { id: 3, text: '오늘', value: 'today' },
  ];
  const [limit, setLimit] = useState(10);

  const onChangeTerm = (e) => {
    dispatch(setValues({ key: 'term', value: e.target.value }));
    setLimit(10);
  };

  useEffect(() => {
    dispatch(getHotReview({ term, limit }));
  }, [dispatch, limit, term]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        reviews.reviews &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop ===
          document.body.scrollHeight &&
        reviews.count > limit
      ) {
        setLimit(limit + 10);
      }
    });
  }, [dispatch, limit, reviews.count, reviews.reviews]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <ContentBlock>
      <div>
        <h2>현재 인기 리뷰!</h2>
        <select onChange={onChangeTerm}>
          {terms.map((data) => (
            <option key={data.id} value={data.value}>
              {data.text}
            </option>
          ))}
        </select>
      </div>
      {reviews &&
        reviews.reviews.map((review) => (
          <ReviewContent review={review} key={review._id} />
        ))}
    </ContentBlock>
  );
};

export default withRouter(HotReviewContainer);
