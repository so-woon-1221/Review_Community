import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  height: 300px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }

  img {
    max-width: 50%;
  }
`;

const ContentDescription = styled.div`
  width: 70%;
  padding-left: 20px;

  h2 {
    margin: 0 0 10px;
  }

  h3 {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryList = styled.ul`
  li {
    float: left;
    display: block;
    padding-right: 10px;
    flex: 1;
  }
  margin: 0;
  padding-bottom: 0;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    cursor: pointer;
  }
`;

const WriteButton = styled(Link)`
  //background: #171c26;
  text-decoration: none;
  //padding: 5px;
  //color: #a7c0f2;
`;

const ReviewListContainer = ({ history }) => {
  const categories = ['all', 'tech', 'food', 'cafe'];
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));

  return (
    <ContentBlock>
      <CategoryWrapper>
        <h2>카테고리</h2>
        <CategoryList>
          {categories.map((category) => (
            // onclick 이벤트 달아서 useEffect에 category state가 바뀌면 렌더링되도록
            // 기본 category staete는 all
            <li>
              <CategoryLink to={`/reviews?category=${category}`}>
                {category}
              </CategoryLink>
            </li>
          ))}
          {user !== '' ? <WriteButton to={'/review'}>글쓰기</WriteButton> : ''}
        </CategoryList>
      </CategoryWrapper>
      <ContentWrapper>
        <img src={'test.jpg'} />
        <ContentDescription>
          <h2>아이폰12</h2>
          <h3>사격형의 아이폰! by 작성자</h3>
          <p>간단 설명</p>
        </ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <img src={'test.jpg'} />
        <ContentDescription>
          <h2>아이폰12</h2>
          <h3>사격형의 아이폰! by 작성자</h3>
          <p>간단 설명</p>
        </ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <img src={'test.jpg'} />
        <ContentDescription>
          <h2>아이폰12</h2>
          <h3>사격형의 아이폰! by 작성자</h3>
          <p>간단 설명</p>
        </ContentDescription>
      </ContentWrapper>
    </ContentBlock>
  );
};

export default ReviewListContainer;
