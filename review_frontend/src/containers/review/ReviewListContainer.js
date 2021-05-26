import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReviewContent from '../../components/review/ReviewContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  getReviews,
  setValues,
  initializeSearch,
  initialize,
} from '../../modules/listReview';

const ContentBlock = styled.div`
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
  //padding-bottom: 10px;
`;

const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  //border-bottom: 1px solid #dddddd;
  //padding-bottom: 10px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex: 1;
  input {
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-right: 20px;
    flex: 1;
    height: 30px;
    font-size: 20px;
  }

  svg {
    cursor: pointer;
    height: 40px;
    font-size: 20px;
    padding: 0;
    margin: 0;
  }
`;

const AuthorWrapper = styled.div`
  display: block;
  align-items: center;
  margin-top: 20px;

  svg:hover {
    color: red;
  }
`;

const BlackLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const PageBlock = styled.div`
  margin-top: 20px;
  //margin-left: 20px;
`;

const ReviewListContainer = ({ location }) => {
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

  const { category, sort, search, author, page, reviews } = useSelector(
    ({ listReview }) => ({
      category: listReview.category,
      sort: listReview.sort,
      search: listReview.search,
      author: listReview.author,
      page: listReview.page,
      reviews: listReview.reviews,
    }),
  );

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    dispatch(getReviews({ category, sort, search, author, page }));
    const categoryLinks = document.querySelectorAll('li');
    for (let categoryLink of categoryLinks) {
      if (categoryLink.dataset.click === category) {
        categoryLink.firstElementChild.classList.add('clicked');
      } else {
        categoryLink.firstElementChild.classList.remove('clicked');
      }
    }
  }, [author, category, dispatch, page, sort]);

  useEffect(() => {
    if (reviews.name) {
      setName(reviews.name);
    }
    if (reviews.count) {
      setCount(reviews.count);
    }
    if (reviews.user) {
      setUser(reviews.user);
    }
  }, [reviews.count, reviews.name, reviews.user]);

  useEffect(() => {
    let query = queryString.parse(location.search);
    if (!query.page) {
      dispatch(setValues({ key: 'page', value: 1 }));
    } else {
      dispatch(setValues({ key: 'page', value: query.page }));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    let query = queryString.parse(location.search);
    if (query.author) {
      dispatch(setValues({ key: 'author', value: query.author }));
    }
  }, [dispatch, location.search]);

  const onClickSearch = () => {
    dispatch(getReviews({ category, sort, search, author, page }));
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, []);

  return (
    <ContentBlock>
      <CategoryBlock>
        <div>
          <h2>카테고리</h2>
          {user !== '' ? (
            <StyledLink to={'/review'} className={'clicked'}>
              <b>글쓰기</b>
            </StyledLink>
          ) : (
            ''
          )}
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.text} data-click={category.value}>
              <StyledLink
                onClick={() =>
                  dispatch(
                    setValues({ key: 'category', value: category.value }),
                  )
                }
              >
                {category.text}
              </StyledLink>
            </li>
          ))}
        </ul>
      </CategoryBlock>
      <SortBlock>
        {sort === 'latest' ? (
          <StyledLink
            onClick={() =>
              dispatch(setValues({ key: 'sort', value: 'latest' }))
            }
            className={'clicked'}
          >
            최신순
          </StyledLink>
        ) : (
          <StyledLink
            onClick={() =>
              dispatch(setValues({ key: 'sort', value: 'latest' }))
            }
          >
            최신순
          </StyledLink>
        )}
        {sort === 'recommend' ? (
          <StyledLink
            onClick={() =>
              dispatch(setValues({ key: 'sort', value: 'recommend' }))
            }
            className={'clicked'}
          >
            추천순
          </StyledLink>
        ) : (
          <StyledLink
            onClick={() =>
              dispatch(setValues({ key: 'sort', value: 'recommend' }))
            }
          >
            추천순
          </StyledLink>
        )}
        {author && (
          <AuthorWrapper>
            <b>
              <i>{name}</i>
            </b>
            {'\u00A0'}님의 글{'\u00A0'}
            <BlackLink
              onClick={() => dispatch(setValues({ key: 'author', value: '' }))}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </BlackLink>
          </AuthorWrapper>
        )}
      </SortBlock>
      <SearchBlock>
        <SearchWrapper>
          <input
            type={'text'}
            placeholder={'검색'}
            value={search}
            onChange={(e) =>
              dispatch(setValues({ key: 'search', value: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onClickSearch();
              }
            }}
            onClick={() => dispatch(initializeSearch())}
          />
          <FontAwesomeIcon icon={faSearch} onClick={onClickSearch} />
        </SearchWrapper>
      </SearchBlock>
      {reviews &&
        (reviews.reviews === '검색 결과 없음' ? (
          <AuthorWrapper>검색결과 없음</AuthorWrapper>
        ) : (
          reviews.reviews.map((review) => (
            <ReviewContent key={review._id} review={review} />
          ))
        ))}
      {count > 1 && (
        <PageBlock>
          {page > 1 && (
            <StyledLink className={'clicked'} to={`/reviews?page=${+page - 1}`}>
              이전
            </StyledLink>
          )}
          {page < Math.ceil(count / 10) && (
            <StyledLink className={'clicked'} to={`/reviews?page=${+page + 1}`}>
              다음
            </StyledLink>
          )}
        </PageBlock>
      )}
    </ContentBlock>
  );
};

export default withRouter(ReviewListContainer);
