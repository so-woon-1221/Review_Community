import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const SET_VALUES = 'listReview/SET_VALUES';
const GET_REVIEWS = 'listReview/GET_REVIEWS';
const GET_REVIEWS_SUCCESS = 'listReview/GET_REVIEWS_SUCCESS';
const GET_REVIEWS_FAILURE = 'listReview/GET_REVIEWS_FAILURE';
const INITIALIZE_SEARCH = 'listReview/INITIALIZE_SEARCH';
const INITIALIZE = 'listReview/INITIALIZE';

export const setValues = createAction(SET_VALUES, ({ key, value }) => ({
  key,
  value,
}));
export const getReviews = createAction(
  GET_REVIEWS,
  ({ category, sort, search, author, page }) => ({
    category,
    sort,
    search,
    author,
    page,
  }),
);
export const initializeSearch = createAction(INITIALIZE_SEARCH);
export const initialize = createAction(INITIALIZE);

const getReviewsApi = ({ category, sort, search, author, page }) =>
  axios.get(
    `/reviews?category=${category}&sort=${sort}&search=${search}&author=${author}&page=${page}`,
  );
const getReviewsSaga = createRequestSaga(GET_REVIEWS, getReviewsApi);

export function* listReviewSaga() {
  yield takeLatest(GET_REVIEWS, getReviewsSaga);
}

const initialState = {
  category: 'all',
  sort: 'latest',
  search: '',
  author: '',
  page: '',
  reviews: '',
};

const listReview = handleActions(
  {
    [SET_VALUES]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [GET_REVIEWS_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
    [INITIALIZE_SEARCH]: (state) => ({
      ...state,
      search: '',
    }),
    [INITIALIZE]: (state) => initialState,
  },
  initialState,
);

export default listReview;
