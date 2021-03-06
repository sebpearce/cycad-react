import { transactions } from './transactions';

test('add a transaction', () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TRANSACTION',
    payload: {
      amt: 19.99,
      date: '2017-03-13',
      cat_id: '2',
    },
  };

  expect(transactions(stateBefore, action)[0]).toHaveProperty('amt', 19.99);
  expect(transactions(stateBefore, action)[0]).toHaveProperty(
    'date',
    '2017-03-13',
  );
  expect(transactions(stateBefore, action)[0]).toHaveProperty('note', '');
  expect(transactions(stateBefore, action)[0]).toHaveProperty('cat_id', '2');
});

test('update a transaction', () => {
  const stateBefore = [
    {
      id: '123',
      amt: 19.99,
      date: '2017-03-13',
      note: '',
      cat_id: '2',
    },
    {
      id: '456',
      amt: 55,
      date: '2017-03-14',
      note: 'Hello',
      cat_id: '4',
    },
  ];
  const action = {
    type: 'UPDATE_TRANSACTION',
    payload: {
      id: '123',
      amt: 1000,
    },
  };
  const stateAfter = [
    {
      id: '123',
      amt: 1000,
      date: '2017-03-13',
      note: '',
      cat_id: '2',
    },
    {
      id: '456',
      amt: 55,
      date: '2017-03-14',
      note: 'Hello',
      cat_id: '4',
    },
  ];

  expect(transactions(stateBefore, action)).toEqual(stateAfter);
});

// TODO: Should we validate input on this reducer, or only on capture?

test('remove a transaction', () => {
  const stateBefore = [
    {
      id: '123',
      amt: 19.99,
      date: '2017-03-13',
      note: '',
      cat_id: '2',
    },
    {
      id: '456',
      amt: 55,
      date: '2017-03-14',
      note: 'Hello',
      cat_id: '4',
    },
  ];
  const action = {
    type: 'REMOVE_TRANSACTION',
    payload: {
      id: '123',
    },
  };
  const stateAfter = [
    {
      id: '456',
      amt: 55,
      date: '2017-03-14',
      note: 'Hello',
      cat_id: '4',
    },
  ];

  expect(transactions(stateBefore, action)).toEqual(stateAfter);
});
