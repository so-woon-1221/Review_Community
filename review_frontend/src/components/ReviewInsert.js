import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';

const EditorBlock = styled.div`
  padding: 20px 15%;

  input[type='text'] {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 20px;
  }
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }
`;

const CategoryWrapper = styled.div`
  font-size: 1.2rem;
  span {
    margin-right: 20px;
  }

  button {
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    background: none;
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

const ThumbnailWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  margin-top: 20px;

  div {
    width: 50%;
    margin-left: -250px;
    box-sizing: border-box;
    position: relative;
    img {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  label {
    font-size: 1.2rem;
    margin-right: 20px;
    &:hover {
      cursor: pointer;
    }
  }

  input[type='file'] {
    margin-bottom: 20px;
    transform: translateX(-1000px);
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background: #171c26;
  color: #a7c0f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    color: #171c26;
    background: #a7c0f2;
  }
`;

const ReviewInsert = ({
  onInsert,
  onChangeField,
  title,
  subtitle,
  content,
  thumbnail,
  category,
}) => {
  const [cate, setCate] = useState('');
  const editor = useRef(null);
  const thumbnailImage = useRef(null);
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeSubtitle = (e) => {
    onChangeField({ key: 'subtitle', value: e.target.value });
  };

  const onChangeContent = useCallback(() => {
    const editorInstance = editor.current.getInstance();
    // const getContent = editorInstance.getHtml();
    const getContent = editorInstance.getMarkdown();
    onChangeField({ key: 'content', value: getContent });
  }, [onChangeField]);

  const encodeBase64ImageFile = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangeThumbnail = (e) => {
    encodeBase64ImageFile(e.target.files[0]).then((data) => {
      const result = data.toString();
      onChangeField({ key: 'thumbnail', value: result });
      thumbnailImage.current.src = result;
    });
  };

  const categories = [
    { id: 1, text: '테크', value: 'tech' },
    { id: 2, text: '맛집', value: 'food' },
    { id: 3, text: '카페', value: 'cafe' },
    { id: 4, text: '게임', value: 'game' },
    { id: 5, text: '패션', value: 'fashion' },
  ];

  const onButtonClick = (e) => {
    const parent = e.target.parentElement;
    const buttons = parent.querySelectorAll('button');
    for (let button of buttons) {
      button.classList.remove('clicked');
    }
    e.target.classList.toggle('clicked');
    setCate(e.target.dataset.category);
  };

  useEffect(() => {
    onChangeField({ key: 'category', value: cate });
  }, [cate, onChangeField]);

  return (
    <EditorBlock>
      <input
        type={'text'}
        value={title}
        onChange={onChangeTitle}
        placeholder={'제목'}
        className={'title'}
      />
      <input
        type={'text'}
        value={subtitle}
        onChange={onChangeSubtitle}
        placeholder={'부제목'}
        className={'subtitle'}
      />
      <CategoryWrapper>
        <span>카테고리</span>
        {categories.map((data) => (
          <button
            key={data.id}
            onClick={onButtonClick}
            data-category={data.value}
          >
            {data.text}
          </button>
        ))}
      </CategoryWrapper>
      <Editor
        previewStyle={'vertical'}
        height={'600px'}
        initialEditType={'markdown'}
        useCommandShorcut={true}
        ref={editor}
        onChange={onChangeContent}
      />
      <ThumbnailWrapper>
        <label htmlFor={'thumbnail'}>썸네일</label>
        <input
          id={'thumbnail'}
          type={'file'}
          onChange={onChangeThumbnail}
          accept={'image/*'}
        />
        <div>
          <img src={''} ref={thumbnailImage} />
        </div>
        <SubmitButton onClick={onInsert}>등록</SubmitButton>
      </ThumbnailWrapper>
    </EditorBlock>
  );
};

export default ReviewInsert;
