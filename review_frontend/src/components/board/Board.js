import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

const Block = styled.div`
  padding: 20px 15%;
  h2 {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }

  &.clicked {
    background: #171c26;
    color: #a7c0f2;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const BoardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  padding-top: 10px;
`;

const BoardWrapper = styled(Link)`
  width: 30%;
  text-decoration: none;
  color: black;
  margin-right: 5%;
  min-height: 200px;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    border-bottom: 1px solid #dddddd;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const BoardImage = styled.div`
  width: 100%;
  height: 200px;

  background: no-repeat center center;
  background-size: cover;

  img {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 50%;
    height: auto;
  }
`;

const BoardContent = styled.div`
  margin: 10px 0;
  //height: 100px;
  h3 {
    margin: 10px 0 0 0;
  }
  h5 {
    margin: 10px 0 0 0;
  }
  @media screen and (max-width: 768px) {
    margin: 0 0 0 20px;
  }
`;

const CategoryBlock = styled.div`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
  }
  div {
    display: flex;
    margin: 0;
    h2 {
      flex: 1;
    }
  }
  @media screen and (max-width: 768px) {
    li {
      margin-bottom: 10px;
    }
  }
`;
const SortBlock = styled.div`
  margin-bottom: 10px;
`;

const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  div {
    &:first-child {
      flex: 1;
    }
  }
  input {
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-right: 20px;
    height: 30px;
    font-size: 20px;
  }
  svg {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Board = ({
  boards,
  nowCategory,
  sort,
  count,
  search,
  onChangeSearch,
  onSearch,
  reset,
  location,
}) => {
  const categories = [
    {
      text: '모두보기',
      value: 'all',
    },
    {
      text: '테크',
      value: 'tech',
    },
    {
      text: '맛집',
      value: 'food',
    },
    {
      text: '카페',
      value: 'cafe',
    },
    {
      text: '게임',
      value: 'game',
    },
    {
      text: '패션',
      value: 'fashion',
    },
  ];
  const createDate = (date) => {
    return date.substr(0, 10);
  };
  const bodyContent = useRef(null);

  useEffect(() => {
    if (
      bodyContent.current.clientHeight <= document.documentElement.clientHeight
    ) {
      bodyContent.current.style.minHeight =
        document.documentElement.clientHeight - 170 + 'px';
    }
  }, [location]);

  return (
    <Block ref={bodyContent}>
      <CategoryBlock>
        <div>
          <h2>카테고리</h2>
          <StyledLink className={'clicked'} to={'/board/question'}>
            <b>질문하기</b>
          </StyledLink>
        </div>
        <ul>
          {categories.map((category) => (
            <li>
              {nowCategory === category.value ? (
                <StyledLink
                  to={`/board?category=${category.value}&sort=${sort}`}
                  className={'clicked'}
                >
                  {category.text}
                </StyledLink>
              ) : (
                <StyledLink
                  to={`/board?category=${category.value}&sort=${sort}`}
                >
                  {category.text}
                </StyledLink>
              )}
            </li>
          ))}
        </ul>
      </CategoryBlock>
      <SortBlock>
        {sort === 'latest' ? (
          <StyledLink
            to={`/board?category=${nowCategory}&sort=latest`}
            className={'clicked'}
          >
            최신순
          </StyledLink>
        ) : (
          <StyledLink to={`/board?category=${nowCategory}&sort=latest`}>
            최신순
          </StyledLink>
        )}
        {/*{sort === 'comment' ? (*/}
        {/*  <StyledLink*/}
        {/*    to={`/board?category=${nowCategory}&sort=comment`}*/}
        {/*    className={'clicked'}*/}
        {/*  >*/}
        {/*    댓글순*/}
        {/*  </StyledLink>*/}
        {/*) : (*/}
        {/*  <StyledLink to={`/board?category=${nowCategory}&sort=comment`}>*/}
        {/*    댓글순*/}
        {/*  </StyledLink>*/}
        {/*)}*/}
      </SortBlock>
      <BoardBlock>
        {count > 0 ? (
          boards.map((board) => (
            <BoardWrapper key={board._id} to={`/board/question/${board._id}`}>
              {board.thumbnail ? (
                <BoardImage
                  style={{ backgroundImage: `url(${board.thumbnail})` }}
                />
              ) : (
                <BoardImage
                  style={{ backgroundImage: `url('forbidden.jpeg')` }}
                />
              )}
              <BoardContent>
                <h2>
                  {board.title} ({board.comment.length})
                </h2>
                <h5>by {board.author.name}</h5>
                <h5>at {createDate(board.createdAt)}</h5>
              </BoardContent>
            </BoardWrapper>
          ))
        ) : (
          <BoardWrapper>검색결과 없음</BoardWrapper>
        )}
      </BoardBlock>
      <SearchBlock>
        <div />
        <div>
          <input
            type={'text'}
            placeholder={'검색'}
            value={search}
            onChange={(e) =>
              onChangeSearch({ key: 'search', value: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
            onClick={reset}
          />
          <FontAwesomeIcon icon={faSearch} onClick={onSearch} />
        </div>
      </SearchBlock>
    </Block>
  );
};

export default withRouter(Board);
