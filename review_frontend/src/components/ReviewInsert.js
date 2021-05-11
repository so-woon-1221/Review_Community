import React from 'react';

const ReviewInsert = ({
  onInsert,
  onChangeField,
  title,
  subtitle,
  content,
  thumbnail,
  category,
}) => {
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeSubtitle = (e) => {
    onChangeField({ key: 'subtitle', value: e.target.value });
  };

  const onChangeContent = (e) => {
    onChangeField({ key: 'content', value: e.target.value });
  };

  const onChangeThumbnail = (e) => {
    onChangeField({ key: 'thumbnail', value: e.target.value });
  };

  const onChangeCategory = (e) => {
    onChangeField({ key: 'category', value: e.target.value });
  };
  return (
    <div>
      <input type={'text'} value={title} onChange={onChangeTitle} />
      <input type={'subtitle'} value={subtitle} onChange={onChangeSubtitle} />
      <input type={'subtitle'} value={content} onChange={onChangeContent} />
      <input type={'subtitle'} value={thumbnail} onChange={onChangeThumbnail} />
      <input type={'subtitle'} value={category} onChange={onChangeCategory} />
      <button onClick={onInsert}>등록</button>
    </div>
  );
};

export default ReviewInsert;
