import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const INITIALIZE = 'question/INITIALIZE';
const CHANGE_VALUE = 'question/CHANGE_VALUE';
const POST_QUESTION = 'question/POST_QUESTION';
const POST_QUESTION_SUCCESS = 'question/POST_QUESTION_SUCCESS';
const POST_QUESTION_FAILURE = 'question/POST_QUESTION_FAILURE';
const GET_QUESTION = 'question/GET_QUESTION';
const GET_QUESTION_SUCCESS = 'question/GET_QUESTION_SUCCESS';
const GET_QUESTION_FAILURE = 'question/GET_QUESTION_FAILURE';
const DELETE_QUESTION = 'question/DELETE_QUESTION';
const DELETE_QUESTION_SUCCESS = 'question/DELETE_QUESTION_SUCCESS';
const DELETE_QUESTION_FAILURE = 'question/DELETE_QUESTION_FAILURE';
const SET_COMMENT = 'question/SET_COMMENT';
const POST_COMMENT = 'question/POST_COMMENT';
const POST_COMMENT_SUCCESS = 'question/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'question/POST_COMMENT_FAILURE';
const RESET_COMMENT = 'question/RESET_COMMENT';

export const initializeQuestion = createAction(INITIALIZE);
export const changeValue = createAction(CHANGE_VALUE, ({ key, value }) => ({
  key,
  value,
}));
export const postQuestion = createAction(
  POST_QUESTION,
  ({ title, content, category, thumbnail }) => ({
    title,
    content,
    category,
    thumbnail,
  }),
);
export const getQuestion = createAction(GET_QUESTION, ({ id }) => ({ id }));
export const deleteQuestion = createAction(DELETE_QUESTION, ({ id }) => ({
  id,
}));
export const setComment = createAction(SET_COMMENT, ({ key, value }) => ({
  key,
  value,
}));
export const postComment = createAction(POST_COMMENT, ({ id, commentId }) => ({
  id,
  commentId,
}));
export const resetComment = createAction(RESET_COMMENT);

const postQuestionApi = ({ title, content, category, thumbnail }) =>
  axios.post('/board/question', {
    title,
    content,
    category,
    thumbnail,
  });
const postQuestionSaga = createRequestSaga(POST_QUESTION, postQuestionApi);

const getQuestionApi = ({ id }) => axios.get(`/board/question/${id}`);
const getQuestionSaga = createRequestSaga(GET_QUESTION, getQuestionApi);

const deleteQuestionApi = ({ id }) => axios.delete(`/board/question/${id}`);
const deleteQuestionSaga = createRequestSaga(
  DELETE_QUESTION,
  deleteQuestionApi,
);

const postCommentApi = ({ id, commentId }) =>
  axios.patch(`/board/question/${id}/comment`, { commentId });
const postCommentSaga = createRequestSaga(POST_COMMENT, postCommentApi);

export function* questionSaga() {
  yield takeLatest(GET_QUESTION, getQuestionSaga);
  yield takeLatest(POST_COMMENT, postCommentSaga);
  yield takeLatest(POST_QUESTION, postQuestionSaga);
  yield takeLatest(DELETE_QUESTION, deleteQuestionSaga);
}

const initialState = {
  title: '',
  category: '',
  thumbnail: '',
  content: '',
  question: '',
  error: '',
  commentId: '',
  deletedQuestion: '',
};

const question = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_VALUE]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [POST_QUESTION_SUCCESS]: (state, { payload: question }) => ({
      ...state,
      question,
    }),
    [POST_QUESTION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_QUESTION_SUCCESS]: (state, { payload: question }) => ({
      ...state,
      question,
    }),
    [GET_QUESTION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_QUESTION_SUCCESS]: (state, { payload: deletedQuestion }) => ({
      ...state,
      deletedQuestion,
    }),
    [DELETE_QUESTION_FAILURE]: (state, { payload: error }) => ({
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
