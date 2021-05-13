import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

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
      background: #dddddd;
    }
    &.clicked {
      background: #dddddd;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  width: 50%;
  display: flex;

  img {
    width: 100%;
    margin-bottom: 20px;
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
    const getContent = editorInstance.getHtml();
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
    { id: 1, text: 'tech' },
    { id: 2, text: 'food' },
    { id: 3, text: 'cafe' },
    { id: 4, text: 'game' },
  ];

  const onButtonClick = (e) => {
    const parent = e.target.parentElement;
    const buttons = parent.querySelectorAll('button');
    for (let button of buttons) {
      button.classList.remove('clicked');
    }
    e.target.classList.toggle('clicked');
    setCate(e.target.textContent);
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
          <button key={data.id} onClick={onButtonClick}>
            {data.text}
          </button>
        ))}
      </CategoryWrapper>
      <ThumbnailWrapper>
        <label htmlFor={'thumbnail'}>썸네일</label>
        <input
          id={'thumbnail'}
          type={'file'}
          onChange={onChangeThumbnail}
          accept={'image/*'}
        />
        <img src={''} ref={thumbnailImage} />
      </ThumbnailWrapper>
      <Editor
        previewStyle={'vertical'}
        height={'600px'}
        initialEditType={'markdown'}
        useCommandShorcut={true}
        ref={editor}
        onChange={onChangeContent}
        plugins={[[codeSyntaxHighlight, { hljs }]]}
      />
      <br />
      <br />
      <button onClick={onInsert}>등록</button>
    </EditorBlock>
  );
};

export default ReviewInsert;
