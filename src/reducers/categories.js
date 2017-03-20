const initialState = [
  { id: '0', name: 'Rent' },
  { id: '1', name: 'Groceries' },
  { id: '2', name: 'Eating out' },
  { id: '3', name: 'Phone' },
  { id: '4', name: 'Internet' },
  { id: '5', name: 'Jiu-jitsu' },
  { id: '6', name: 'Petrol' },
  { id: '7', name: 'Car maintenance' },
  { id: '8', name: 'Haircuts' },
  { id: '9', name: 'Medical' },
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
