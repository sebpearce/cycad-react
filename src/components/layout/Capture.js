import React from 'react';
import { connect } from 'react-redux';
import { CaptureModal } from '../capture-modal/CaptureModal';
import { store } from '../../store';

export const Capture = (
  {
    transactions,
    addTransaction,
    updateAmountInput,
    updateDateInput,
    updateNoteInput,
    updateCategoryInput,
    clearState,
    capture,
  },
) => {
  return (
    <div>
      {/* <CaptureModal /> */}
      <input type="text" onChange={updateAmountInput} />
      <input type="text" onChange={updateDateInput} />
      <input type="text" onChange={updateNoteInput} />
      <input type="text" onChange={updateCategoryInput} />
      <button
        onClick={() => {
          addTransaction(capture);
        }}
      >Add!</button>
      <button onClick={clearState}>Clear state</button>
      <pre>
        {JSON.stringify(store.getState(), null, '  ')}
      </pre>
    </div>
  );
};

const updateAmountInput = evt => {
  store.dispatch({
    type: 'UPDATE_AMOUNT_INPUT',
    payload: { amt: evt.target.value },
  });
};

const updateDateInput = evt => {
  store.dispatch({
    type: 'UPDATE_DATE_INPUT',
    payload: { date: evt.target.value },
  });
};

const updateNoteInput = evt => {
  store.dispatch({
    type: 'UPDATE_NOTE_INPUT',
    payload: { note: evt.target.value },
  });
};

const updateCategoryInput = evt => {
  store.dispatch({
    type: 'UPDATE_CATEGORY_INPUT',
    payload: { cat_id: evt.target.value },
  });
};

const addTransaction = props => {
  const newTransaction = {
    id: '12345',
    amt: props.amountInput,
    date: props.dateInput,
    note: props.noteInput,
    cat_id: props.categoryInput,
  };
  store.dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  capture: state.capture,
});

const mapDispatchToProps = dispatch => ({
  updateAmountInput,
  updateDateInput,
  updateNoteInput,
  updateCategoryInput,
  addTransaction,
  clearState() {
    dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
  },
});

export const CaptureContainer = connect(mapStateToProps, mapDispatchToProps)(
  Capture,
);

// export const CaptureContainer = connect(store => {
//   return {
//     addTransaction,
//     updateAmountInput,
//     updateDateInput,
//     updateNoteInput,
//     updateCategoryInput,
//   };
// })(Capture);

// How to dispatch:
// const mapStateToProps = (state, ownProps) => {
//   return {
//     activeParty: true,
//   };
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch({
//         type: 'ADD_TRANSACTION',
//         id: '123',
//         amt: 19.99,
//         date: '2017-03-13',
//         cat_id: 2,
//       });
//     },
//   };
// };
//
// const Capture = connect(mapStateToProps, mapDispatchToProps)(Flub);
//
// export default Capture;
