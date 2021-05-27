import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const SET_VALUES = 'hotReview/SET_VALUES';
const GET_HOT_REVIEW = 'hotReview/GET_HOT_REVIEW';
const GET_HOT_REVIEW_SUCCESS = 'hotReview/GET_HOT_REVIEW_SUCCESS';
const GET_HOT_REVIEW_FAILURE = 'hotReview/GET_HOT_REVIEW_FAILURE';
const INITIALIZE = 'hotReview/INITIALIZE';

export const setValues = createAction(SET_VALUES, ({ key, value }) => ({
  key,
  value,
}));
export const getHotReview = createAction(GET_HOT_REVIEW, ({ limit, term }) => ({
  limit,
  term,
}));
export const initialize = createAction(INITIALIZE);

const getHotReviewApi = ({ limit, term }) =>
  axios.get(`/api/index?limit=${limit}&term=${term}`);
const getHotReviewSaga = createRequestSaga(GET_HOT_REVIEW, getHotReviewApi);

export function* hotReviewSaga() {
  yield takeLatest(GET_HOT_REVIEW, getHotReviewSaga);
}

const initialState = {
  term: 'month',
  reviews: '',
};

const hotReview = handleActions(
  {
    [SET_VALUES]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [GET_HOT_REVIEW_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
    [INITIALIZE]: (state) => initialState,
  },
  initialState,
);

export default hotReview;
