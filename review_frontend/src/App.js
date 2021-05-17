import React from 'react';
import IndexPage from './pages/IndexPage';
import ReviewListPage from './pages/ReviewListPage';
import ReviewInsertPage from './pages/ReviewInsertPage';
import LoginPage from './pages/LoginPage';
import LogoutContainer from './containers/login/LogoutContainer';
import RegisterPage from './pages/RegisterPage';
import ReviewPage from './pages/ReviewPage';
import ReviewUpdatePage from './pages/ReviewUpdatePage';
import QuestionPage from './pages/QuestionPage';
import { Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';

const App = () => {
  return (
    <>
      <Route path={'/'} component={IndexPage} exact={true} />
      <Route path={'/reviews'} component={ReviewListPage} exact={true} />
      <Route path={'/reviews/:id'} component={ReviewPage} />
      <Route path={'/board'} component={BoardPage} exact={true} />
      <Route path={'/board/question'} component={QuestionPage} />
      <Route path={'/review'} component={ReviewInsertPage} exact={true} />
      <Route path={'/review/:id'} component={ReviewUpdatePage} />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/logout'} component={LogoutContainer} />
      <Route path={'/register'} component={RegisterPage} />
    </>
  );
};

export default App;
