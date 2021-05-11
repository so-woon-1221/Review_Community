import React, { useCallback } from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { insert, changeField } from '../modules/post';

const PostContainer = () => {
  const { title, subtitle } = useSelector((state) => ({
    title: state.post.title,
    subtitle: state.post.subtitle,
  }));
  const dispatch = useDispatch();
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  const onInsert = () => {
    dispatch(insert({ title, subtitle }));
  };

  return (
    <Post
      onChangeField={onChangeField}
      onInsert={onInsert}
      title={title}
      subtitle={subtitle}
    />
  );
};

export default PostContainer;
