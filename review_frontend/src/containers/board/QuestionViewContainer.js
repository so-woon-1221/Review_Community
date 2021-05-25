import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuestion,
  setComment,
  postComment,
  resetComment,
  initializeQuestion,
  deleteQuestion,
} from '../../modules/question';
import {
  setContent,
  writeComment,
  initialize,
  deleteComment,
} from '../../modules/comment';
import { withRouter } from 'react-router-dom';
import QuestionView from '../../components/board/QuestionView';

const QuestionViewContainer = ({ match, history }) => {
  const {
    question,
    questionError,
    commentId,
    comment,
    commentError,
    content,
    deleteResult,
    deleteError,
    deletedQuestion,
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
    deleteResult: comment.deleteResult,
    deleteError: comment.deleteError,
    deletedQuestion: question.deletedQuestion,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const id = match.params.id;
    dispatch(getQuestion({ id }));
  }, [dispatch, match.params.id, deleteResult]);

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
      dispatch(initializeQuestion());
    };
  }, [dispatch]);

  const onDeleteComment = (e) => {
    if (e.target.dataset.name) {
      const id = e.target.dataset.name;
      dispatch(deleteComment({ id }));
      console.log(deleteResult);
    }
  };

  const onDeleteQuestion = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const id = match.params.id;
      dispatch(deleteQuestion({ id }));
    }
  };

  useEffect(() => {
    if (deletedQuestion) {
      history.push('/board');
    }
  });

  return (
    question && (
      <QuestionView
        question={question.question}
        user={question.user}
        comment={comment}
        commentId={commentId}
        onChangeContent={onChangeContent}
        commentContent={content}
        onWrite={onWrite}
        onDeleteComment={onDeleteComment}
        deleteResult={deleteResult}
        onDeleteQuestion={onDeleteQuestion}
      />
    )
  );
};

export default withRouter(QuestionViewContainer);
