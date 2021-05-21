import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Block = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }
`;

const QuestionBlock = styled.div`
  h1 {
    margin: 0;
  }
  h3 {
    margin: 5px 0;
  }
`;

const CommentBlock = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
`;

const QuestionView = ({
  question,
  onChangeContent,
  commentContent,
  onWrite,
}) => {
  const {
    title,
    createdAt,
    content,
    comment,
    author,
    category,
    thumbnail,
  } = question;
  return (
    <Block>
      <QuestionBlock>
        <h1>{title}</h1>
        <h3>{createdAt.substr(0, 10)}</h3>
        <h3>{author.name}</h3>
        <h3>{content}</h3>
      </QuestionBlock>
      <CommentBlock>
        {comment &&
          comment.map((data) => (
            <h5 key={data._id}>
              {data.comment}
              {data.createdAt}
            </h5>
          ))}
        <input
          type={'text'}
          value={commentContent}
          onChange={(e) =>
            onChangeContent({ key: 'content', value: e.target.value })
          }
        />
        <button onClick={onWrite}>등록</button>
      </CommentBlock>
    </Block>
  );
};

export default withRouter(QuestionView);
