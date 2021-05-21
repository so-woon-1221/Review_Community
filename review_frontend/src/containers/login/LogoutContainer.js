import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../modules/login';
import { useDispatch } from 'react-redux';

const LogoutContainer = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(logoutUser());
      localStorage.removeItem('user');
      history.push('/');
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, history]);

  return <div></div>;
};

export default withRouter(LogoutContainer);
