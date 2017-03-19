export const transactions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const out = {
        id: action.payload.id,
        amt: action.payload.amt,
        date: action.payload.date,
        note: action.payload.note || '',
        cat_id: action.payload.cat_id,
      };
      return [...state, out];
    case 'UPDATE_TRANSACTION':
      const indexUpdated = state.findIndex(
        trans => trans.id === action.payload.id,
      );

      const updated = {
        ...state[indexUpdated],
        ...action.payload,
      };

      return [
        ...state.slice(0, indexUpdated),
        updated,
        ...state.slice(indexUpdated + 1),
      ];

    case 'REMOVE_TRANSACTION':
      return state.filter(el => el.id !== action.payload.id);
    default:
      return state;
  }
};
