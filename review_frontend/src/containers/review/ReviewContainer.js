import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Review from '../../components/review/Review';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReviewContainer = ({ match, history }) => {
  const [review, setReview] = useState('');
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));

  const id = match.params.id;
  useEffect(() => {
    fetch(`/api/review/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setReview(result);
      });
  }, [id]);

  const onClickUp = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = 1;
      await axios.post(`/api/review/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  const onClickDown = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = -1;
      await axios.post(`/api/review/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  const onDelete = async () => {
    if (window.confirm('삭제하시겟습니까?') && review) {
      const result = axios.delete(`/api/review/${id}`);
      if (result) {
        history.push('/reviews');
        window.location.reload();
      }
    }
  };

  return (
    <Review
      review={review}
      onClickUp={onClickUp}
      onClickDown={onClickDown}
      onDelete={onDelete}
      user={user}
    />
  );
};

export default withRouter(ReviewContainer);
