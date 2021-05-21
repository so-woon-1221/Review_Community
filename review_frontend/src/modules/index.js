import { combineReducers } from 'redux';
import loading from './loading';
import review, { reviewSaga } from './review';
import login, { loginSaga } from './login';
import register, { registerSaga } from './register';
import board, { boardSaga } from './board';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  review,
  loading,
  login,
  register,
  board,
});
export function* rootSaga() {
  yield all([reviewSaga(), loginSaga(), registerSaga(), boardSaga()]);
}

export default rootReducer;
