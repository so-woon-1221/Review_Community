import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'review/INITIALIZE';
const CHANGE_FIELD = 'review/CHANGE_FIELD';
const INSERT = 'review/INSERT';
const INSERT_SUCCESS = 'review/INSERT_SUCCESS';
const INSERT_FAILURE = 'review/INSERT_FAILURE';
const GET = 'review/GET';
const GET_SUCCESS = 'review/GET_REVIEWS';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const insert = createAction(
  INSERT,
  ({ title, subtitle, content, thumbnail, category, author }) => ({
    title,
    subtitle,
    content,
    thumbnail,
    category,
    author,
  }),
);
export const get = createAction(GET, ({ id }) => ({ id }));

const insertReview = ({
  title,
  subtitle,
  content,
  thumbnail,
  category,
  author,
}) =>
  axios.post('/api/review', {
    title,
    subtitle,
    content,
    thumbnail,
    category,
    author,
  });
const insertSaga = createRequestSaga(INSERT, insertReview);

const getReview = ({ id }) => axios.get(`/api/reviews/${id}`);
const getReviewSaga = createRequestSaga(GET, getReview);

export function* reviewSaga() {
  yield takeLatest(INSERT, insertSaga);
  yield takeLatest(GET, getReviewSaga);
}

const initialState = {
  title: '',
  subtitle: '',
  content: '',
  thumbnail: '',
  category: '',
  review: '',
  error: '',
  author: '',
};

const review = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [INSERT]: (state) => ({
      ...state,
      review: '',
    }),
    [INSERT_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [INITIALIZE]: (state) => initialState,
  },
  initialState,
);

export default review;
