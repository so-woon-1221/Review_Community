import { combineReducers } from 'redux';
import loading from './loading';
import review, { reviewSaga } from './review';
import login, { loginSaga } from './login';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ review, loading, login });
export function* rootSaga() {
  yield all([reviewSaga(), loginSaga()]);
}

export default rootReducer;
