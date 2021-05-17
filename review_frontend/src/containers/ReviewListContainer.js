import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReviewContent from '../components/ReviewContent';

const ContentBlock = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-wrap: wrap;

  h2 {
    margin: 0 0 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  //border-bottom: 1px solid #dddddd;
  h2 {
    margin-bottom: 0;
  }
`;

const CategoryList = styled.ul`
  li {
    float: left;
    display: block;
    padding-right: 10px;
  }
  margin: 0;
  padding-bottom: 0;
  padding-left: 20px;
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
  position: absolute;
  right: 0;
  top: 0;
  h2 {
    margin-bottom: 0;
  }

  &:hover {
    border-bottom: 1px solid #171c26;
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
  const [nowCategory, setNowCategory] = useState('');
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));
  const [sort, setSort] = useState('');
  const [reviews, setReviews] = useState(null);
  const latest = useRef(null);
  const recommend = useRef(null);

  useEffect(() => {
    let query = queryString.parse(location.search);
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
      // latest.current.style.paddingLeft = '10px';
    } else {
      recommend.current.classList.add('clicked');
      latest.current.classList.remove('clicked');
      // latest.current.style.paddingLeft = '0';
    }
    const categoryLinks = document.querySelectorAll('li');
    for (let categoryLink of categoryLinks) {
      if (categoryLink.dataset.click === nowCategory) {
        console.log(categoryLink.dataset.click);
        categoryLink.firstElementChild.classList.add('clicked');
      } else {
        categoryLink.firstElementChild.classList.remove('clicked');
      }
    }
    fetch(`/reviews?category=${nowCategory}&sort=${sort}`)
      .then((response) => response.json())
      .then((result) => {
        setReviews(result.reviews);
        if (result.user) {
          localStorage.setItem('user', result.user._id);
        }
      });
  }, [location.search, nowCategory, sort]);

  return (
    <ContentBlock>
      <CategoryWrapper>
        <h2>카테고리</h2>
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
          {user !== '' ? (
            <WriteButton to={'/review'}>
              <h2>글쓰기</h2>
            </WriteButton>
          ) : (
            ''
          )}
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
    </ContentBlock>
  );
};

export default withRouter(ReviewListContainer);
