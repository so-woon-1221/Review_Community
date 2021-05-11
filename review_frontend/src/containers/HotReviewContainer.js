import React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-wrap: wrap;

  h2 {
    margin: 0 0 10px;
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

const HotReviewContainer = () => {
  return (
    <ContentBlock>
      <div>
        <h2>현재 인기 리뷰!</h2>
      </div>
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

export default HotReviewContainer;
