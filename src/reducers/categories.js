const initialState = [
  { id: '0', name: 'beef' },
  { id: '1', name: 'chicken' },
  { id: '2', name: 'pork' },
  { id: '3', name: 'turkey' },
  { id: '4', name: 'lamb' },
  { id: '5', name: 'venison' },
];

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return state;
    case 'UPDATE_CATEGORY':
      return state;
    case 'REMOVE_CATEGORY':
      return state;
    default:
      return state;
  }
};
