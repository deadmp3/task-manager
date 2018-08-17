import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
//import { initToken } from './lib/token';
import getPreloadedState from './lib/preloadedState';
//import addSocketHandlers from './socket';
import App from './components/App';

const run = async () => {
  //await initToken();

  const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line
  const devtoolMiddleware = ext ? ext() : noop => noop;
  const store = createStore(
    reducers,
    await getPreloadedState(),
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );

  //addSocketHandlers(store);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('taskManager'),
  );
};

run();
