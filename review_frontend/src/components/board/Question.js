import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';

const QuestionBlock = styled.div`
  padding: 20px 15%;

  input[type='text'] {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #dddddd;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const CategoryBlock = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 18px;
    margin-right: 30px;
  }

  button {
    background: white;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    margin-right: 10px;

    &:hover {
      background: #171c26;
      color: #a7c0f2;
    }
    &.clicked {
      background: #171c26;
      color: #a7c0f2;
    }
  }
`;

const EditorBlock = styled.div`
  margin-bottom: 20px;
`;

const WriteButton = styled.button`
  background: #171c26;
  color: #a7c0f2;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
`;

const Question = ({ title, onChangeValue, onPostQuestion }) => {
  const categories = [
    { id: 1, text: '테크', value: 'tech' },
    { id: 2, text: '맛집', value: 'food' },
    { id: 3, text: '카페', value: 'cafe' },
    { id: 4, text: '게임', value: 'game' },
    { id: 5, text: '패션', value: 'fashion' },
  ];
  const editor = useRef(null);

  const onCategoryClick = (e) => {
    const parentDiv = e.target.parentElement;
    const buttons = parentDiv.querySelectorAll('button');
    for (let button of buttons) {
      button.classList.remove('clicked');
    }
    e.target.classList.add('clicked');
    onChangeValue({ key: 'category', value: e.target.dataset.category });
  };

  const onChangeContent = () => {
    onChangeValue({
      key: 'content',
      value: editor.current.getInstance().getMarkdown(),
    });
  };

  const sendImage = async (img) => {
    const formData = new FormData();
    formData.append('image', img);
    const result = await axios.post('/review/image', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    onChangeValue({ key: 'thumbnail', value: result.data });

    return result.data;
  };

  return (
    <QuestionBlock>
      <input
        placeholder={'제목'}
        type={'text'}
        value={title}
        onChange={(e) => onChangeValue({ key: 'title', value: e.target.value })}
      />
      <CategoryBlock>
        <span>카테고리</span>
        {categories.map((data) => (
          <button
            key={data.id}
            onClick={onCategoryClick}
            data-category={data.value}
          >
            {data.text}
          </button>
        ))}
      </CategoryBlock>
      <EditorBlock>
        <Editor
          previewStyle={'vertical'}
          height={'700px'}
          initialEditType={'markdown'}
          useCommandShorcut={true}
          ref={editor}
          onChange={onChangeContent}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              if (blob.size > 5 * 1024 * 1024) {
                alert('용량 초과');
              } else {
                const upload = await sendImage(blob);
                callback(upload, 'alt text');
              }
              return false;
            },
          }}
        />
      </EditorBlock>
      <WriteButton onClick={onPostQuestion}>등록</WriteButton>
    </QuestionBlock>
  );
};

export default Question;
