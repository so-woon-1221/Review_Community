import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const Block = styled.div`
  padding: 20px 15%;

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
  }

  svg {
    cursor: pointer;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  padding-bottom: 10px;
  div {
    flex: 1;
  }
  h1 {
    margin: 0;
  }
  h3 {
    margin: 5px 0;
  }
  h4 {
    margin: 10px 0;
    color: #aaaaaa;
  }
`;

const ContentBlock = styled.div`
  padding: 10px 0;
`;

const CommentBlock = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  padding: 20px 0 0 0;
  border-bottom: 1px solid #dddddd;

  h3 {
    margin: 0 0 20px 0;
  }
`;

const CommentWrapper = styled.div`
  h5 {
    margin: 0;
    display: flex;

    i {
      padding-left: 20px;
      color: #aaaaaa;
      flex: 1;
    }
    svg:hover {
      color: red;
    }
  }

  p {
    margin: 20px 0;
  }
`;

const CommentPostBlock = styled.div`
  padding: 20px 0 10px;
  display: flex;
  align-items: center;
  h5 {
    padding-right: 20px;
    margin: 0;
  }
  input {
    flex: 1;
    border: none;
    font-size: 18px;
    border-bottom: 1px solid #dddddd;
  }
  svg {
    margin-left: 20px;
  }
`;

const QuestionView = ({
  question,
  onChangeContent,
  commentContent,
  onWrite,
  user,
  onDeleteComment,
  deleteResult,
}) => {
  const { title, createdAt, content, comment, author, category } = question;

  const createdDate = (date) => {
    const dateSet = date.split('T');
    return dateSet[0].substr(0, 10) + ' ' + dateSet[1].substr(0, 8);
  };
  return (
    <Block>
      <QuestionHeader>
        <div>
          <h1>{title}</h1>
          <h4>{createdDate(createdAt)}</h4>
        </div>
        <h3>{author.name}</h3>
      </QuestionHeader>
      <ContentBlock>
        <Viewer initialValue={content} />
      </ContentBlock>
      <CommentBlock>
        <h3>댓글 ({comment.length})</h3>
        {comment &&
          comment.map((data) => (
            <CommentWrapper key={data._id}>
              <h5>
                {data.authorName} <i>{createdDate(data.createdAt)}</i>
                {data.authorName === user.name ? (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={onDeleteComment}
                    data-name={data._id}
                  />
                ) : (
                  ''
                )}
              </h5>
              <p>{data.comment}</p>
            </CommentWrapper>
          ))}
      </CommentBlock>
      {/*로그인 해있을 시만 댓글 등록 창 보임*/}
      {user && (
        <CommentPostBlock>
          <h5>{user.name}</h5>
          <input
            type={'text'}
            value={commentContent}
            onChange={(e) =>
              onChangeContent({ key: 'content', value: e.target.value })
            }
            placeholder={'댓글을 입력하세요'}
          />
          <FontAwesomeIcon icon={faPen} onClick={onWrite}>
            등록
          </FontAwesomeIcon>
        </CommentPostBlock>
      )}
    </Block>
  );
};

export default withRouter(QuestionView);
