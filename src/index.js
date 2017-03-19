import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { store } from './store';
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

store.subscribe(() => {
  console.log('Store changed:', JSON.stringify(store.getState()));
});

store.dispatch({
  type: 'ADD_TRANSACTION',
  payload: {
    id: '123',
    amt: 19.99,
    date: '2017-03-13',
    cat_id: 2,
  }
});
