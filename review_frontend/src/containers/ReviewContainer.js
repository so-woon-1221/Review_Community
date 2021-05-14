import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Review from '../components/Review';
import axios from 'axios';

const ReviewContainer = ({ match }) => {
  const [review, setReview] = useState('');
  const id = match.params.id;
  useEffect(() => {
    fetch(`/reviews/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setReview(result);
      });
  }, [id]);

  const onClickUp = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = 1;
      await axios.post(`/reviews/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  const onClickDown = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = -1;
      await axios.post(`/reviews/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  return (
    <Review review={review} onClickUp={onClickUp} onClickDown={onClickDown} />
  );
};

export default withRouter(ReviewContainer);
