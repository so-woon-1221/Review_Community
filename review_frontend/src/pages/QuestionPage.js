import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const QuestionPage = () => {
  const { user } = useSelector(({ login }) => ({
    user: login.user,
  }));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {});
  const onClick = async () => {
    const result = await axios.post('/board/', {
      title,
      content,
      author: user,
    });
    console.log(result.data);
  };
  return (
    <div>
      <input
        type={'text'}
        placeholder={'title'}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type={'text'}
        placeholder={'content'}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={onClick}>등록</button>
    </div>
  );
};

export default QuestionPage;
