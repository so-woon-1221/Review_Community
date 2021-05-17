import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const INITIALIZE = 'register/INITIALIZE';
const CHANGE_FIELD = 'register/CHANGE_FIELD';
const REGISTER = 'register/REGISTER';
const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'register/REGISTER_FAILURE';
const CHECK_EMAIL = 'register/CHECK_EMAIL';
const CHECK_EMAIL_SUCCESS = 'register/CHECK_EMAIL_SUCCESS';
const CHECK_NAME = 'register/CHECK_NAME';
const CHECK_NAME_SUCCESS = 'register/CHECK_NAME_SUCCESS';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const registerUser = createAction(
  REGISTER,
  ({ email, name, password }) => ({
    email,
    name,
    password,
  }),
);
export const checkEmail = createAction(CHECK_EMAIL, ({ email }) => ({ email }));
export const checkName = createAction(CHECK_NAME, ({ name }) => ({ name }));

export const registerUserApi = ({ email, name, password }) =>
  axios.post('/auth/join', { email, name, password });
const registerUserSaga = createRequestSaga(REGISTER, registerUserApi);

export const checkEmailApi = ({ email }) =>
  axios.post('/auth/join/check/email', { email });
const checkEmailSaga = createRequestSaga(CHECK_EMAIL, checkEmailApi);

export const checkNameApi = ({ name }) =>
  axios.post('/auth/join/check/name', { name });
const checkNameSaga = createRequestSaga(CHECK_NAME, checkNameApi);

export function* registerSaga() {
  yield takeLatest(REGISTER, registerUserSaga);
  yield takeLatest(CHECK_EMAIL, checkEmailSaga);
  yield takeLatest(CHECK_NAME, checkNameSaga);
}

const initialState = {
  email: '',
  name: '',
  password: '',
  user: '',
  checkEmail: '',
  checkName: '',
  error: null,
};

const register = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [REGISTER]: (state) => ({
      ...state,
      user: '',
    }),
    [REGISTER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHECK_EMAIL_SUCCESS]: (state, { payload: checkEmail }) => ({
      ...state,
      checkEmail: checkEmail.message,
    }),
    [CHECK_NAME_SUCCESS]: (state, { payload: checkName }) => ({
      ...state,
      checkName: checkName.message,
    }),
  },
  initialState,
);

export default register;
