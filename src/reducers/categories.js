const initialState = [
  { id: '0', name: 'Rent' },
  { id: '1', name: 'Gas' },
  { id: '2', name: 'Water' },
  { id: '3', name: 'Electricity' },
  { id: '4', name: 'Internet' },
  { id: '5', name: 'Phone' },
  { id: '6', name: 'Public transport' },
  { id: '7', name: 'Travel' },
  { id: '8', name: 'Groceries' },
  { id: '9', name: 'Eating out' },
  { id: '10', name: 'Clothes' },
  { id: '11', name: 'Haircuts' },
  { id: '12', name: 'Leisure' },
  { id: '13', name: 'Books' },
  { id: '14', name: 'Games' },
  { id: '15', name: 'Netflix' },
  { id: '16', name: 'Gym' },
  { id: '17', name: 'Jiu-jitsu' },
  { id: '18', name: 'Petrol' },
  { id: '19', name: 'Car' },
  { id: '20', name: 'Equipment/Gadgets' },
  { id: '21', name: 'Furniture' },
  { id: '22', name: 'Gifts' },
  { id: '23', name: 'Donations' },
  { id: '24', name: 'One-offs' },
  { id: '25', name: 'Medical' },
  { id: '26', name: 'Other' },
  { id: '27', name: 'Salary' },
  { id: '28', name: 'Partner’s salary' },
  { id: '29', name: 'Tax return' },
  { id: '30', name: 'Windfall' },
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
