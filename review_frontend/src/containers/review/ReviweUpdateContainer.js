import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ReviewUpdate from '../../components/review/ReviewUpdate';

const ReviewUpdateContainer = ({ match, history }) => {
  const [review, setReview] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    const getReviews = async () => {
      const result = await axios.get(`/review/${id}`);
      setReview(result.data);
    };
    getReviews();
  }, []);

  const onSubmit = async (title, subtitle, content, thumbnail, category) => {
    try {
      const result = await axios.patch(`/review/${id}`, {
        title,
        subtitle,
        content,
        thumbnail,
        category,
      });
      if ((result.data.title = title)) {
        window.alert('수정되었습니다.');
        history.push(`/reviews/${id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <ReviewUpdate review={review} onSubmit={onSubmit} />;
};

export default withRouter(ReviewUpdateContainer);
