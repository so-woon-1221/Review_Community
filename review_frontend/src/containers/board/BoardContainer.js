import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue, getBoard, resetSearch } from '../../modules/board';
import Board from '../../components/board/Board';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';

const MessageBlock = styled.div`
  padding: 20px 15%;
`;

const BoardContainer = ({ location }) => {
  const { boards, category, sort, search } = useSelector(({ board }) => ({
    boards: board.board,
    category: board.category,
    sort: board.sort,
    search: board.search,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const getBoards = async () => {
      dispatch(getBoard({ category, sort, search }));
    };
    getBoards().then(() => {});
  }, [category, dispatch, sort]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.category) {
      dispatch(changeValue({ key: 'category', value: query.category }));
    }
    if (query.sort) {
      dispatch(changeValue({ key: 'sort', value: query.sort }));
    }
  }, [location.search, dispatch]);

  const onChangeSearch = useCallback(
    (payload) => {
      dispatch(changeValue(payload));
    },
    [dispatch],
  );

  const onSearch = () => {
    dispatch(getBoard({ category, sort, search }));
  };

  const reset = () => {
    dispatch(resetSearch());
  };

  return boards ? (
    <Board
      boards={boards.board}
      nowCategory={category}
      sort={sort}
      count={boards.count}
      onChangeSearch={onChangeSearch}
      search={search}
      onSearch={onSearch}
      reset={reset}
    />
  ) : (
    <MessageBlock>로딩중입니다.</MessageBlock>
  );
};

export default withRouter(BoardContainer);
