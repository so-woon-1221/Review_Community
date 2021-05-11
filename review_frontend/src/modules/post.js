import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'post/CHANGE_FIELD';
const INSERT = 'post/INSERT';
const INSERT_SUCCESS = 'post/INSERT_SUCCESS';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const insert = createAction(INSERT, ({ title, subtitle }) => ({
  title,
  subtitle,
}));

const inputPost = ({ title, subtitle }) =>
  axios.post('/post', { title, subtitle });
const insertSaga = createRequestSaga(INSERT, inputPost);

export function* postSaga() {
  yield takeLatest(INSERT, insertSaga);
}

const initialState = {
  title: '',
  subtitle: '',
  posts: '',
};

const post = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    // [INSERT]: async (state, action) => {
    //   await axios.post('/post', { state });
    // },
    [INSERT_SUCCESS]: (state, action) => ({
      ...state,
      posts: action.payload,
    }),
  },
  initialState,
);

export default post;
