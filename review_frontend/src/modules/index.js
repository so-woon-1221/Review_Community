import { combineReducers } from 'redux';
import loading from './loading';
import review, { reviewSaga } from './review';
import login, { loginSaga } from './login';
import register, { registerSaga } from './register';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ review, loading, login, register });
export function* rootSaga() {
  yield all([reviewSaga(), loginSaga(), registerSaga()]);
}

export default rootReducer;
