import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const INITIALIZE = 'question/INITIALIZE';
const GET_QUESTION = 'question/GET_QUESTION';
const GET_QUESTION_SUCCESS = 'question/GET_QUESTION_SUCCESS';
const GET_QUESTION_FAILURE = 'question/GET_QUESTION_FAILURE';
const SET_COMMENT = 'question/SET_COMMENT';
const POST_COMMENT = 'question/POST_COMMENT';
const POST_COMMENT_SUCCESS = 'question/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'question/POST_COMMENT_FAILURE';
const RESET_COMMENT = 'question/RESET_COMMENT';

export const initialize = createAction(INITIALIZE);
export const getQuestion = createAction(GET_QUESTION, ({ id }) => ({ id }));
export const setComment = createAction(SET_COMMENT, ({ key, value }) => ({
  key,
  value,
}));
export const postComment = createAction(POST_COMMENT, ({ id, commentId }) => ({
  id,
  commentId,
}));
export const resetComment = createAction(RESET_COMMENT);

const getQuestionApi = ({ id }) => axios.get(`/board/question/${id}`);
const getQuestionSaga = createRequestSaga(GET_QUESTION, getQuestionApi);

const postCommentApi = ({ id, commentId }) =>
  axios.patch(`/board/question/${id}/comment`, { commentId });
const postCommentSaga = createRequestSaga(POST_COMMENT, postCommentApi);

export function* questionSaga() {
  yield takeLatest(GET_QUESTION, getQuestionSaga);
  yield takeLatest(POST_COMMENT, postCommentSaga);
}

const initialState = {
  question: '',
  error: '',
  commentId: '',
};

const question = handleActions(
  {
    [INITIALIZE]: (state) => ({
      ...state,
      initialState,
    }),
    [GET_QUESTION_SUCCESS]: (state, { payload: question }) => ({
      ...state,
      question,
    }),
    [GET_QUESTION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SET_COMMENT]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [POST_COMMENT]: (state) => ({
      ...state,
    }),
    [POST_COMMENT_SUCCESS]: (state, { payload: question }) => ({
      ...state,
      question,
    }),
    [POST_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [RESET_COMMENT]: (state) => ({
      ...state,
      commentId: '',
    }),
  },
  initialState,
);

export default question;
