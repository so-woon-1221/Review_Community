import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import { tempSetUser } from './modules/login';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch(tempSetUser(user));
  } catch (e) {
    console.log('localStorage is not working');
  }
}
sagaMiddleWare.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
