import React from 'react';
import { connect } from 'react-redux';
import { CaptureModal } from '../capture-modal/CaptureModal';
import { store } from '../../store';

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

const getISODate = dateObj => {
  return dateObj.toISOString().slice(0, 10);
};

const adjustDate = delta => {
  const dateObj = new Date(store.getState().capture.dateInput);
  const newDate = new Date(dateObj.getTime() + delta * 864e5);
  store.dispatch({
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: getISODate(newDate),
    },
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
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  updateAmountInput,
  updateDateInput,
  updateNoteInput,
  updateCategoryInput,
  addTransaction,
  adjustDate,
  clearState() {
    dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
  },
});

export const Capture = (
  {
    transactions,
    capture,
    categories,
    addTransaction,
    updateAmountInput,
    updateDateInput,
    updateNoteInput,
    updateCategoryInput,
    clearState,
  },
) => {
  return (
    <div>
      <CaptureModal
        date={capture.dateInput}
        amt={capture.amountInput}
        note={capture.noteInput}
        cat_id={capture.categoryInput}
        handleAmountChange={updateAmountInput}
        handleDateChange={updateDateInput}
        handleNoteChange={updateNoteInput}
        handleCategoryChange={updateCategoryInput}
        adjustDate={adjustDate}
        categories={categories}
      />

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

export const CaptureContainer = connect(mapStateToProps, mapDispatchToProps)(
  Capture,
);
