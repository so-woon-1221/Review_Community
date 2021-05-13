import React from 'react';
import IndexPage from './pages/IndexPage';
import ReviewListPage from './pages/ReviewListPage';
import ReviewInsertPage from './pages/ReviewInsertPage';
import LoginPage from './pages/LoginPage';
import LogoutContainer from './containers/LogoutContainer';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route path={'/'} component={IndexPage} exact={true} />
      <Route path={'/reviews'} component={ReviewListPage} />
      <Route path={'/board'} />
      <Route path={'/review'} component={ReviewInsertPage} />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/logout'} component={LogoutContainer} />
    </>
  );
};

export default App;
