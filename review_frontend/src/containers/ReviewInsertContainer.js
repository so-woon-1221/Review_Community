import React, { useCallback, useEffect } from 'react';
import ReviewInsert from '../components/ReviewInsert';
import { useSelector, useDispatch } from 'react-redux';
import { insert, changeField } from '../modules/review';
import { withRouter } from 'react-router-dom';

const ReviewInsertContainer = ({ history }) => {
  const { title, subtitle, content, thumbnail, category, review } = useSelector(
    ({ review }) => ({
      title: review.title,
      subtitle: review.subtitle,
      content: review.content,
      thumbnail: review.thumbnail,
      category: review.category,
      review: review.review,
    }),
  );

  const dispatch = useDispatch();
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  const onInsert = () => {
    dispatch(insert({ title, subtitle, content, thumbnail, category }));
  };

  useEffect(() => {
    if (review.title === title && title !== '') {
      alert('등록되었습니다.');
      history.push('/');
    }
    if (review.message != null) {
      alert(review.message);
    }
  }, [history, review]);

  return (
    <ReviewInsert
      onChangeField={onChangeField}
      onInsert={onInsert}
      title={title}
      subtitle={subtitle}
      content={content}
      thumbnail={thumbnail}
      category={category}
    />
  );
};

export default withRouter(ReviewInsertContainer);
