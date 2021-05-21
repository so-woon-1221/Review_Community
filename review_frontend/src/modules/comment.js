import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const INITIALIZE = 'comment/INITIALIZE';
const SET_CONTENT = 'comment/SET_CONTENT';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const WRITE_COMMENT_SUCCESS = 'comment/WRITE_COMMENT_SUCCESS';
const WRITE_COMMENT_FAILURE = 'comment/WRITE_COMMENT_FAILURE';

export const initialize = createAction(INITIALIZE);
export const setContent = createAction(SET_CONTENT, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ content }) => ({
  content,
}));

const writeCommentApi = ({ content }) => axios.post('/comment', { content });
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, writeCommentApi);

export function* commentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
  comment: '',
  content: '',
  error: '',
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
  },
  initialState,
);

export default comment;
