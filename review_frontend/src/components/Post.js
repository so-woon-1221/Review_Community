import React from 'react';

const Post = ({ onInsert, onChangeField, title, subtitle }) => {
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeSubtitle = (e) => {
    onChangeField({ key: 'subtitle', value: e.target.value });
  };
  return (
    <div>
      <input type={'text'} value={title} onChange={onChangeTitle} />
      <input type={'subtitle'} value={subtitle} onChange={onChangeSubtitle} />
      <button onClick={onInsert}>등록</button>
    </div>
  );
};

export default Post;
