import React, { useCallback, useEffect } from 'react';
import ReviewInsert from '../../components/review/ReviewInsert';
import { useSelector, useDispatch } from 'react-redux';
import { insert, changeField, initialize } from '../../modules/review';
import { withRouter } from 'react-router-dom';

const ReviewInsertContainer = ({ history }) => {
  let {
    title,
    subtitle,
    content,
    thumbnail,
    category,
    review,
    author,
    error,
  } = useSelector(({ review, login }) => ({
    title: review.title,
    subtitle: review.subtitle,
    content: review.content,
    thumbnail: review.thumbnail,
    category: review.category,
    review: review.review,
    author: login.user,
    error: review.error,
  }));

  const dispatch = useDispatch();
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  const onInsert = () => {
    if (author._id) {
      author = author._id;
    }
    let errorMessage = '';
    if (title === '') {
      errorMessage += '[제목] ';
    }
    if (subtitle === '') {
      errorMessage += '[부제목] ';
    }
    if (content === '') {
      errorMessage += '[본문] ';
    }
    if (thumbnail === '') {
      errorMessage += '[썸네일] ';
    }
    if (category === '') {
      errorMessage += '[카테고리] ';
    }
    if (errorMessage !== '') {
      alert(`${errorMessage} 빈칸입니다. `);
      return;
    }
    dispatch(
      insert({
        title,
        subtitle,
        content,
        thumbnail,
        category,
        author,
      }),
    );
  };

  useEffect(() => {
    if (review.title === title && title !== '') {
      alert('등록되었습니다.');
      dispatch(initialize());
      history.push('/');
    }
    if (review.message) {
      alert(review.message);
    }
    if (error) {
      alert(error);
    }
  }, [dispatch, history, review, title]);

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
