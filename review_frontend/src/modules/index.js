import { combineReducers } from 'redux';
import loading from './loading';
import review, { reviewSaga } from './review';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ review, loading });
export function* rootSaga() {
  yield all([reviewSaga()]);
}

export default rootReducer;
