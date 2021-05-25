import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postQuestion,
  changeValue,
  initializeQuestion,
} from '../../modules/question';
import Question from '../../components/board/Question';
import { withRouter } from 'react-router-dom';

const QuestionContainer = ({ history }) => {
  const { title, content, thumbnail, category, question } = useSelector(
    ({ question }) => ({
      title: question.title,
      content: question.content,
      thumbnail: question.thumbnail,
      category: question.category,
      question: question.question,
    }),
  );

  const dispatch = useDispatch();

  const onPostQuestion = () => {
    if (title === '') {
      alert('제목을 입력하세요');
    } else if (content === '') {
      alert('내용을 입력하세요');
    } else {
      dispatch(postQuestion({ title, content, thumbnail, category }));
    }
  };

  const onChangeValue = (payload) => {
    dispatch(changeValue(payload));
  };

  useEffect(() => {
    if (question) {
      alert('등록 되었습니다.');
      history.push('/board');
    }
    return () => {
      dispatch(initializeQuestion());
    };
  }, [dispatch, history, question]);

  return (
    <Question
      title={title}
      onPostQuestion={onPostQuestion}
      onChangeValue={onChangeValue}
    />
  );
};

export default withRouter(QuestionContainer);
