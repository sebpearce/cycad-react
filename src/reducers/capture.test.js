import { capture } from './capture';

test('accepts demical without zero prefix', () => {
  const stateBefore = {
    amountInput: 42,
  };
  const action = {
    type: 'UPDATE_AMOUNT_INPUT',
    payload: {
      amt: 0.98,
    },
  };
  const stateAfter = {
    amountInput: 0.98,
  };
  
  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('interpets non-numerical input as nothing', () => {
  const stateBefore = {
    amountInput: 123.00,
  };
  const action = {
    type: 'UPDATE_AMOUNT_INPUT',
    payload: {
      amt: 'afta4',
    },
  };
  const stateAfter = {
    amountInput: 0,
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('accepts negative numbers', () => {
  const stateBefore = {
    amountInput: 123,
  };
  const action = {
    type: 'UPDATE_AMOUNT_INPUT',
    payload: {
      amt: -720,
    },
  };
  const stateAfter = {
    amountInput: -720,
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('updates the date input', () => {
  const stateBefore = {
    dateInput: '2017-03-01',
  };
  const action = {
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: '2017-03-19',
    },
  };
  const stateAfter = {
    dateInput: '2017-03-19',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('ignores dates that violate the YYYY-MM-DD format', () => {
  const stateBefore = {
    dateInput: '2017-03-01',
  };
  const action = {
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: '19-03-2017',
    },
  };
  const stateAfter = {
    dateInput: '2017-03-01',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('ignores impossible dates like 2017-03-99', () => {
  const stateBefore = {
    dateInput: '2017-03-01',
  };
  const action = {
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: '2017-03-99',
    },
  };
  const stateAfter = {
    dateInput: '2017-03-01',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('updates the note input', () => {
  const stateBefore = {
    noteInput: 'pickle',
  };
  const action = {
    type: 'UPDATE_NOTE_INPUT',
    payload: {
      note: 'walrus',
    },
  };
  const stateAfter = {
    noteInput: 'walrus',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('updates the category id input', () => {
  const stateBefore = {
    categoryInput: '2',
  };
  const action = {
    type: 'UPDATE_CATEGORY_INPUT',
    payload: {
      cat_id: '999',
    },
  };
  const stateAfter = {
    categoryInput: '999',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

test('only accepts integers', () => {
  const stateBefore = {
    categoryInput: '2',
  };
  const action = {
    type: 'UPDATE_CATEGORY_INPUT',
    payload: {
      cat_id: 'lol',
    },
  };
  const stateAfter = {
    categoryInput: '',
  };

  expect(capture(stateBefore, action)).toEqual(stateAfter);
});

// TODO: make sure cat ids are within the range of valid ones in the store
