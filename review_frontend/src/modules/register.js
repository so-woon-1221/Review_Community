import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const INITIALIZE = 'register/INITIALIZE';
const CHANGE_FIELD = 'register/CHANGE_FIELD';
const REGISTER = 'register/REGISTER';
const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'register/REGISTER_FAILURE';

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

const registerUserApi = ({ email, name, password }) =>
  axios.post('/auth/join', { email, name, password });

const registerUserSaga = createRequestSaga(REGISTER, registerUserApi);

export function* registerSaga() {
  yield takeLatest(REGISTER, registerUserSaga);
}

const initialState = {
  email: '',
  name: '',
  password: '',
  user: '',
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
  },
  initialState,
);

export default register;
