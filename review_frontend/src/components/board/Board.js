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

  &:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const BoardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  //border-top: 1px solid #dddddd;
  padding-top: 10px;
`;

const BoardWrapper = styled(Link)`
  width: 30%;
  text-decoration: none;
  color: black;
  margin-right: 5%;
  min-height: 200px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-right: 0;
    &:last-child {
      margin-bottom: 0;
    }
    border-bottom: 1px solid #dddddd;
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
    width: 40%;
    height: auto;
  }
`;

const BoardContent = styled.div`
  margin: 10px 0;
  h3 {
    margin: 10px 0 0 0;
  }
  h5 {
    margin: 10px 0 0 0;
  }
  @media screen and (max-width: 768px) {
    margin: 0 0 0 20px;
    width: 60%;
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
// const SortBlock = styled.div`
//   margin-bottom: 15px;
// `;

const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  div {
    width: 100%;
    display: flex;
    align-items: center;
  }
  input {
    flex: 1;
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-right: 20px;
    height: 30px;
    font-size: 20px;
  }
  svg {
    font-size: 20px;
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
  user,
}) => {
  const categories = [
    {
      text: '????????????',
      value: 'all',
    },
    {
      text: '??????',
      value: 'tech',
    },
    {
      text: '??????',
      value: 'food',
    },
    {
      text: '??????',
      value: 'cafe',
    },
    {
      text: '??????',
      value: 'game',
    },
    {
      text: '??????',
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
          <h2>????????????</h2>
          {user && (
            <StyledLink className={'clicked'} to={'/board/question'}>
              <b>????????????</b>
            </StyledLink>
          )}
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
      {/*<SortBlock>*/}
      {/*  {sort === 'latest' ? (*/}
      {/*    <StyledLink*/}
      {/*      to={`/board?category=${nowCategory}&sort=latest`}*/}
      {/*      className={'clicked'}*/}
      {/*    >*/}
      {/*      ?????????*/}
      {/*    </StyledLink>*/}
      {/*  ) : (*/}
      {/*    <StyledLink to={`/board?category=${nowCategory}&sort=latest`}>*/}
      {/*      ?????????*/}
      {/*    </StyledLink>*/}
      {/*  )}*/}
      {/*  {sort === 'comment' ? (*/}
      {/*    <StyledLink*/}
      {/*      to={`/board?category=${nowCategory}&sort=comment`}*/}
      {/*      className={'clicked'}*/}
      {/*    >*/}
      {/*      ?????????*/}
      {/*    </StyledLink>*/}
      {/*  ) : (*/}
      {/*    <StyledLink to={`/board?category=${nowCategory}&sort=comment`}>*/}
      {/*      ?????????*/}
      {/*    </StyledLink>*/}
      {/*  )}*/}
      {/*</SortBlock>*/}
      <SearchBlock>
        <div>
          <input
            type={'text'}
            placeholder={'??????'}
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
                {board.author.name && <h5>by {board.author.name}</h5>}
                <h5>at {createDate(board.createdAt)}</h5>
              </BoardContent>
            </BoardWrapper>
          ))
        ) : (
          <BoardWrapper>???????????? ??????</BoardWrapper>
        )}
      </BoardBlock>
    </Block>
  );
};

export default withRouter(Board);
