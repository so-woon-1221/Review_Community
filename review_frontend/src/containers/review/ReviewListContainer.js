import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReviewContent from '../../components/review/ReviewContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ContentBlock = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  //border-bottom: 1px solid #dddddd;
  h2 {
    margin-bottom: 0;
    @media screen and (max-width: 768px) {
      flex: 1;
    }
  }
`;

const CategoryHeader = styled.div`
  width: 100%;
  display: flex;
  h2 {
    margin: 0 0 10px;
    flex: 1;
  }
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-right: 65px;
  margin: 0;
  padding-bottom: 0;
  padding-left: 0;
  li {
    display: block;
    margin-right: 10px;

    @media screen and (max-width: 768px) {
      margin-bottom: 10px;
      margin-top: 10px;
      width: 70px;
    }
  }
  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }

  &.clicked {
    background: #171c26;
    color: #a7c0f2;
  }
`;

const WriteButton = styled(Link)`
  text-decoration: none;
  color: #171c26;
  h2 {
    margin: 0;
  }

  &:hover {
    border-bottom: 1px solid #171c26;
  }

  @media screen and (max-width: 768px) {
    top: 0;
  }
`;

const SortBlock = styled.div`
  margin-top: 15px;
  border-bottom: 1px solid #dddddd;
  width: 100%;
  padding-bottom: 10px;
`;

const SortLink = styled(StyledLink)`
  margin-right: 10px;
`;

const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;

  div {
    flex: 1;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
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
  }
`;

const AuthorWrapper = styled.div`
  display: block;
  align-items: center;
  margin-top: 10px;

  svg:hover {
    color: red;
  }
`;

const BlackLink = styled(Link)`
  color: black;
  text-decoration: none;
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

  const [nowCategory, setNowCategory] = useState('');
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));
  const [sort, setSort] = useState('');
  const [reviews, setReviews] = useState(null);
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const latest = useRef(null);
  const recommend = useRef(null);

  const onClickSearch = () => {
    fetch(
      `/reviews/?category=${nowCategory}&sort=${sort}&search=${search}${author}`,
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReviews(result.reviews);
        if (result.user) {
          localStorage.setItem('user', result.user._id);
        }
      });
  };

  useEffect(() => {
    let query = queryString.parse(location.search);
    // console.log(query);
    if (!query.category) {
      query.category = 'all';
    }
    if (!query.sort) {
      query.sort = 'latest';
    }
    if (query.author) {
      setAuthor(`&author=${query.author}`);
    } else {
      setAuthor('');
    }
    setNowCategory(query.category);
    setSort(query.sort);

    if (sort === 'latest') {
      latest.current.classList.add('clicked');
      recommend.current.classList.remove('clicked');
    } else {
      recommend.current.classList.add('clicked');
      latest.current.classList.remove('clicked');
    }
    const categoryLinks = document.querySelectorAll('li');
    for (let categoryLink of categoryLinks) {
      if (categoryLink.dataset.click === nowCategory) {
        categoryLink.firstElementChild.classList.add('clicked');
      } else {
        categoryLink.firstElementChild.classList.remove('clicked');
      }
    }
  }, [author, location.search, nowCategory, sort]);
  useEffect(() => {
    fetch(
      `/reviews?category=${nowCategory}&sort=${sort}${author}&search=${search}`,
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.name) {
          setName(result.name.name);
        }
        setReviews(result.reviews);
        if (result.user) {
          localStorage.setItem('user', result.user._id);
        }
      });
  }, [author, nowCategory, sort]);

  return (
    <ContentBlock>
      <CategoryWrapper>
        <CategoryHeader>
          <h2>카테고리</h2>
          {user !== '' ? (
            <WriteButton to={'/review'}>
              <h2>글쓰기</h2>
            </WriteButton>
          ) : (
            ''
          )}
        </CategoryHeader>
        <CategoryList>
          {categories.map((category) => (
            // onclick 이벤트 달아서 useEffect에 category state가 바뀌면 렌더링되도록
            // 기본 category staete는 all
            <li key={category.text} data-click={category.value}>
              <StyledLink
                to={`/reviews?category=${category.value}&sort=${sort}${author}&search=${search}`}
              >
                {category.text}
              </StyledLink>
            </li>
          ))}
        </CategoryList>
      </CategoryWrapper>
      <SortBlock>
        <SortLink
          to={`reviews?category=${nowCategory}&sort=latest${author}&search=${search}`}
          ref={latest}
        >
          최신순
        </SortLink>
        <SortLink
          to={`reviews?category=${nowCategory}&sort=recommend${author}&search=${search}`}
          ref={recommend}
        >
          추천순
        </SortLink>
        {author && (
          <AuthorWrapper>
            <b>
              <i>{name}</i>
            </b>
            {'\u00A0'}님의 글{'\u00A0'}
            <BlackLink
              to={`reviews?category=${nowCategory}&sort=${sort}&search=${search}`}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </BlackLink>
          </AuthorWrapper>
        )}
      </SortBlock>
      {reviews &&
        (reviews === '검색 결과 없음' ? (
          <AuthorWrapper>검색결과 없음</AuthorWrapper>
        ) : (
          reviews.map((review) => (
            <ReviewContent key={review._id} review={review} />
          ))
        ))}
      <SearchBlock>
        <div />
        <SearchWrapper>
          <input
            type={'text'}
            placeholder={'검색'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onClickSearch();
              }
            }}
          />
          <FontAwesomeIcon icon={faSearch} onClick={onClickSearch} />
        </SearchWrapper>
      </SearchBlock>
    </ContentBlock>
  );
};

export default withRouter(ReviewListContainer);
