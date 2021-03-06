import { v4 } from 'uuid';

export const transactions = (state = [], action) => {
  switch (action.type) {
    // TODO: should not accept 0.00
    case 'ADD_TRANSACTION':
      const newTransaction = {
        id: v4(),
        amt: action.payload.amt,
        date: action.payload.date,
        note: action.payload.note || '',
        cat_id: action.payload.cat_id,
      };
      return [...state, newTransaction];

    case 'UPDATE_TRANSACTION':
      return state.map(t => {
        if (t.id === action.payload.id) return { ...t, ...action.payload };
        return t;
      });

    case 'REMOVE_TRANSACTION':
      return state.filter(el => el.id !== action.payload.id);
      
    case 'CLEAR_ALL_TRANSACTIONS':
      return [];

    default:
      return state;
  }
};
