import { combineReducers, createStore } from 'redux';
import { transactions } from './reducers';

const rootReducer = combineReducers({
  transactions,
});

export const store = createStore(rootReducer);
