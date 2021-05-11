import React from 'react';
import IndexPage from './pages/IndexPage';
import ReviewListPage from './pages/ReviewListPage';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route path={'/'} component={IndexPage} exact={true} />
      <Route path={'/reviews'} component={ReviewListPage} />
      <Route path={'/board'} />
    </>
  );
};

export default App;
