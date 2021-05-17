import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Review from '../components/Review';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReviewContainer = ({ match, history }) => {
  const [review, setReview] = useState('');
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));

  const id = match.params.id;
  useEffect(() => {
    fetch(`/review/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setReview(result);
      });
  }, [id]);

  const onClickUp = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = 1;
      await axios.post(`/review/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  const onClickDown = async () => {
    if (review) {
      const recommend = review.recommend;
      const number = -1;
      await axios.post(`/review/${id}/recommend`, { recommend, number });
      window.location.reload();
    }
  };

  const onDelete = async () => {
    if (window.confirm('삭제하시겟습니까?') && review) {
      const result = axios.delete(`/review/${id}`);
      if (result) {
        history.push('/');
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
