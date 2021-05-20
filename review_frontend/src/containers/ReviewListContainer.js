import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReviewContent from '../components/ReviewContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  //position: absolute;
  //right: 0;
  //bottom: 0;
  //top: 0;
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
  float: right;
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
  //position: relative;

  select {
    margin-right: 20px;
    border-radius: 5px;
    border: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  input {
    //width: 300px;
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-right: 20px;
  }

  div {
    cursor: pointer;
  }
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
  ];

  const searchOption = [
    { text: '제목+내용', value: 'all' },
    { text: '제목', value: 'title' },
    { text: '내용', value: 'content' },
    { text: '작성자', value: 'author' },
  ];
  const [nowCategory, setNowCategory] = useState('');
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));
  const [sort, setSort] = useState('');
  const [reviews, setReviews] = useState(null);
  const [search, setSearch] = useState('');
  const latest = useRef(null);
  const recommend = useRef(null);

  const onClickSearch = () => {
    fetch(
      `/reviews/search?category=${nowCategory}&sort=${sort}&search=${search}`,
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

    fetch(`/reviews?category=${nowCategory}&sort=${sort}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReviews(result.reviews);
        if (result.user) {
          localStorage.setItem('user', result.user._id);
        }
      });
  }, [location.search, nowCategory, sort]);

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
                to={`/reviews?category=${category.value}&sort=${sort}`}
              >
                {category.text}
              </StyledLink>
            </li>
          ))}
        </CategoryList>
      </CategoryWrapper>
      <SortBlock>
        <SortLink
          to={`reviews?category=${nowCategory}&sort=latest`}
          ref={latest}
        >
          최신순
        </SortLink>
        <SortLink
          to={`reviews?category=${nowCategory}&sort=recommend`}
          ref={recommend}
        >
          추천순
        </SortLink>
      </SortBlock>
      {reviews &&
        reviews.map((review) => (
          <ReviewContent key={review._id} review={review} />
        ))}
      <SearchBlock>
        {/*<select*/}
        {/*  name={'search'}*/}
        {/*  onChange={(e) => {*/}
        {/*    setOption(e.target.value);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {searchOption.map((option) => (*/}
        {/*    <option key={option.value}>{option.text}</option>*/}
        {/*  ))}*/}
        {/*</select>*/}
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
          <div>
            <FontAwesomeIcon icon={faSearch} onClick={onClickSearch} />
          </div>
        </SearchWrapper>
      </SearchBlock>
    </ContentBlock>
  );
};

export default withRouter(ReviewListContainer);
