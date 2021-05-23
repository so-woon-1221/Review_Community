import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const INITIALIZE = 'comment/INITIALIZE';
const SET_CONTENT = 'comment/SET_CONTENT';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const WRITE_COMMENT_SUCCESS = 'comment/WRITE_COMMENT_SUCCESS';
const WRITE_COMMENT_FAILURE = 'comment/WRITE_COMMENT_FAILURE';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'comment/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'comment/DELETE_COMMENT_FAILURE';

export const initialize = createAction(INITIALIZE);
export const setContent = createAction(SET_CONTENT, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ content }) => ({
  content,
}));
export const deleteComment = createAction(DELETE_COMMENT, ({ id }) => ({ id }));

const writeCommentApi = ({ content }) => axios.post('/comment', { content });
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, writeCommentApi);

const deleteCommentApi = ({ id }) => axios.delete(`/comment/${id}`);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, deleteCommentApi);

export function* commentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
}

const initialState = {
  comment: '',
  content: '',
  error: '',
  deleteResult: '',
  deleteError: '',
};

const comment = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [SET_CONTENT]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_COMMENT_SUCCESS]: (state, { payload: deleteResult }) => ({
      ...state,
      deleteResult,
    }),
    [DELETE_COMMENT_FAILURE]: (state, { payload: deleteError }) => ({
      ...state,
      deleteError,
    }),
  },
  initialState,
);

export default comment;
