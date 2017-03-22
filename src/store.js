import { combineReducers, createStore } from 'redux';
import { transactions, capture, categories } from './reducers';
import { loadState } from './localStorage';

const rootReducer = combineReducers({
  transactions,
  capture,
  categories,
});

const initialState = loadState();

export const store = createStore(rootReducer, initialState);

store.subscribe(()=> {console.log(JSON.stringify(store.getState().capture, null, '  '))});
