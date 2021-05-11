import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'review/CHANGE_FIELD';
const INSERT = 'review/INSERT';
const INSERT_SUCCESS = 'review/INSERT_SUCCESS';
const GET = 'review/GET';
const GET_SUCCESS = 'review/GET_REVIEWS';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const insert = createAction(
  INSERT,
  ({ title, subtitle, content, thumbnail, category }) => ({
    title,
    subtitle,
    content,
    thumbnail,
    category,
  }),
);
export const get = createAction(GET);

const insertReview = ({ title, subtitle, content, thumbnail, category }) =>
  axios.post('/review', { title, subtitle, content, thumbnail, category });
const insertSaga = createRequestSaga(INSERT, insertReview);

const getReviews = () => axios.get('/reviews');
const getSaga = createRequestSaga(GET, getReviews);

export function* reviewSaga() {
  yield takeLatest(INSERT, insertSaga);
  yield takeLatest(GET, getSaga);
}

const initialState = {
  title: '',
  subtitle: '',
  content: '',
  thumbnail: '',
  category: '',
  review: '',
  reviews: null,
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
    [GET]: (state) => ({
      ...state,
      reviews: null,
    }),
    [GET_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
  },
  initialState,
);

export default review;
