import { combineReducers } from 'redux';
import loading from './loading';
import review, { reviewSaga } from './review';
import login, { loginSaga } from './login';
import register, { registerSaga } from './register';
import board, { boardSaga } from './board';
import question, { questionSaga } from './question';
import comment, { commentSaga } from './comment';
import hotReview, { hotReviewSaga } from './hotReview';
import listReview, { listReviewSaga } from './listReview';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  review,
  loading,
  login,
  register,
  board,
  question,
  comment,
  hotReview,
  listReview,
});
export function* rootSaga() {
  yield all([
    reviewSaga(),
    loginSaga(),
    registerSaga(),
    boardSaga(),
    questionSaga(),
    commentSaga(),
    hotReviewSaga(),
    listReviewSaga(),
  ]);
}

export default rootReducer;
