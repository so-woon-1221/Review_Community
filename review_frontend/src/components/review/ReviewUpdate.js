import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';

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

  @media screen and (max-width: 768px) {
    padding: 20px 5%;
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

const ReviewUpdate = ({ review, onSubmit }) => {
  const editor = useRef(null);
  const thumbnailImage = useRef(null);
  const [nowCategory, setNowCategory] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const onChangeContent = useCallback(() => {
    const editorInstance = editor.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    setContent(getContent);
  }, []);

  const onChangeThumbnail = async (e) => {
    const result = await sendImage(e.target.files[0]);
    setThumbnail(result);
    thumbnailImage.current.src = result;
  };

  const sendImage = async (img) => {
    const formData = new FormData();
    formData.append('image', img);
    const result = await axios.post('/api/review/image', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });

    return result.data;
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
    e.target.classList.add('clicked');
    setNowCategory(e.target.dataset.category);
  };

  const onUpdate = () => {
    onSubmit(title, subtitle, content, thumbnail, nowCategory);
  };

  useEffect(() => {
    if (review) {
      setTitle(review.title);
      setSubtitle(review.subtitle);
      setContent(review.content);
      setNowCategory(review.category);
      setThumbnail(review.thumbnail);
    }
  }, [review]);
  useEffect(() => {
    const categoryButtons = document.querySelectorAll('.category-button');
    for (let categoryButton of categoryButtons) {
      if (categoryButton.dataset.category === nowCategory) {
        categoryButton.classList.add('clicked');
      }
    }
  }, [nowCategory]);

  return (
    review && (
      <EditorBlock>
        <input
          type={'text'}
          placeholder={'제목'}
          className={'title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={'text'}
          placeholder={'부제목'}
          className={'subtitle'}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <CategoryWrapper>
          <span>카테고리</span>
          {categories.map((data) => (
            <button
              key={data.id}
              onClick={onButtonClick}
              data-category={data.value}
              className={'category-button'}
            >
              {data.text}
            </button>
          ))}
        </CategoryWrapper>
        {content && (
          <Editor
            previewStyle={'vertical'}
            height={'600px'}
            initialEditType={'markdown'}
            useCommandShorcut={true}
            ref={editor}
            onChange={onChangeContent}
            initialValue={content}
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
        )}
        <ThumbnailWrapper>
          <label htmlFor={'thumbnail'}>썸네일</label>
          <input
            id={'thumbnail'}
            type={'file'}
            onChange={onChangeThumbnail}
            accept={'image/*'}
          />
          <div>
            <img src={thumbnail} ref={thumbnailImage} />
          </div>
          <SubmitButton onClick={onUpdate}>수정</SubmitButton>
        </ThumbnailWrapper>
      </EditorBlock>
    )
  );
};

export default ReviewUpdate;
