import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const CHANGE_FIELD = 'login/CHANGE_FIELD';
const INITIALIZE = 'login/INITIALIZE';
const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const LOGOUT = 'login/LOGOUT';
const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
const TEMP_SET_USER = 'login/TEMP_SET_USER';
const CLEAR_USER = 'login/CLEAR_USER';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const initialize = createAction(INITIALIZE);
export const loginUser = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));
export const logoutUser = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const clearUser = createAction(CLEAR_USER);

const loginUserApi = ({ email, password }) =>
  axios.post('/auth/login', { email, password });
const loginUserSaga = createRequestSaga(LOGIN, loginUserApi);

const logoutUserApi = () => axios.get('/auth/logout');
const logoutUserSaga = createRequestSaga(LOGOUT, logoutUserApi);

export function* loginSaga() {
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(LOGOUT, logoutUserSaga);
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
    [LOGOUT_SUCCESS]: (state) => initialState,
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CLEAR_USER]: (state) => ({
      ...state,
      user: '',
    }),
  },
  initialState,
);

export default login;
