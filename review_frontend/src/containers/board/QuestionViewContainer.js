import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuestion,
  setComment,
  postComment,
  resetComment,
} from '../../modules/question';
import { setContent, writeComment, initialize } from '../../modules/comment';
import { withRouter } from 'react-router-dom';
import QuestionView from '../../components/board/QuestionView';

const QuestionViewContainer = ({ match }) => {
  const {
    question,
    questionError,
    commentId,
    comment,
    commentError,
    content,
  } = useSelector(({ question, comment, loading }) => ({
    question: question.question,
    questionError: question.error,
    // 질문에 넣는 댓글의 아이디
    commentId: question.commentId,
    // 생성된 질문의 댓글
    comment: comment.comment,
    // 질문의 댓글의 내용
    content: comment.content,
    commentError: comment.error,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const id = match.params.id;
    dispatch(getQuestion({ id }));
  }, [dispatch, match.params.id]);

  const onChangeContent = useCallback(
    (payload) => {
      dispatch(setContent(payload));
    },
    [dispatch],
  );

  const onWrite = () => {
    dispatch(writeComment({ content }));
  };

  useEffect(() => {
    if (comment._id) {
      const id = comment._id;
      dispatch(setComment({ key: 'commentId', value: id }));
    }
    if (commentId) {
      dispatch(postComment({ id: match.params.id, commentId }));
    }
  }, [comment._id, commentId, dispatch, match.params.id]);

  useEffect(() => {
    return () => {
      dispatch(resetComment());
      dispatch(initialize());
    };
  }, []);

  return (
    question && (
      <QuestionView
        question={question}
        comment={comment}
        commentId={commentId}
        onChangeContent={onChangeContent}
        commentContent={content}
        onWrite={onWrite}
      />
    )
  );
};

export default withRouter(QuestionViewContainer);
