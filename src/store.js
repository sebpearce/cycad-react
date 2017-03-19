import { combineReducers, createStore } from 'redux';
import { transactions, capture } from './reducers';
import { loadState } from './localStorage';

const rootReducer = combineReducers({
  transactions,
  capture,
});

const initialState = loadState();

  // transactions: [
  //   {
  //     id: '123',
  //     amt: '19.99',
  //     date: '2017-03-13',
  //     note: '',
  //     cat_id: '2',
  //   },
  // ],
export const store = createStore(rootReducer, initialState);
