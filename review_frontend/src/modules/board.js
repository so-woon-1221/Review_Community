import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import axios from 'axios';

const INITIALIZE = 'board/INITIALIZE';
const CHANGE_VALUE = 'board/CHANGE_VALUE';
const RESET_SEARCH = 'board/RESET_SEARCH';
const GET_BOARD = 'board/GET_BOARD';
const GET_BOARD_SUCCESS = 'board/GET_BOARD_SUCCESS';
const GET_BOARD_FAILURE = 'board/GET_BOARD_FAILURE';

export const initialize = createAction(INITIALIZE);
export const changeValue = createAction(CHANGE_VALUE, ({ key, value }) => ({
  key,
  value,
}));
export const resetSearch = createAction(RESET_SEARCH);
export const getBoard = createAction(
  GET_BOARD,
  ({ category, sort, search }) => ({
    category,
    sort,
    search,
  }),
);

const getBoardApi = ({ category, sort, search }) =>
  axios.get(`/board?category=${category}&sort=${sort}&search=${search}`);
const getBoardSaga = createRequestSaga(GET_BOARD, getBoardApi);

export function* boardSaga() {
  yield takeLatest(GET_BOARD, getBoardSaga);
}

const initialState = {
  board: '',
  category: 'all',
  sort: 'latest',
  search: '',
  error: null,
};

const board = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_VALUE]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [RESET_SEARCH]: (state) => ({
      ...state,
      search: '',
    }),
    [GET_BOARD_SUCCESS]: (state, { payload: board }) => ({
      ...state,
      board,
    }),
    [GET_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default board;
