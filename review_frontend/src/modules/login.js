import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const CHANGE_FIELD = 'login/CHANGE_FIELD';
const INITIALIZE = 'login/INITIALIZE';
const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const initialize = createAction(INITIALIZE);
export const loginUser = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));

const loginUserApi = ({ email, password }) =>
  axios.post('/auth/login', { email, password });
const loginUserSaga = createRequestSaga(LOGIN, loginUserApi);

export function* loginSaga() {
  yield takeLatest(LOGIN, loginUserSaga);
}

const initialState = {
  email: '',
  password: '',
  user: '',
  error: null,
};

const login = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [LOGIN]: (state) => ({
      ...state,
      user: '',
    }),
    [LOGIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default login;
