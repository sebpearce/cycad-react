import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { store } from './store';
import { saveState } from './localStorage';
import { throttle } from 'lodash';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

store.subscribe(throttle(() => {
  saveState({
    transactions: store.getState().transactions,
    // categories: store.getState().categories,
  });
}, 1000));
