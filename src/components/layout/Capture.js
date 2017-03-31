import React from 'react';
import { connect } from 'react-redux';
import { CaptureModal } from '../capture-modal/CaptureModal';
import { store } from '../../store';
import TransactionList from '../transaction-list/TransactionList';
import CategorySummary from '../category-summary/CategorySummary';
import styles from './Capture.css';
import { groupByProperty } from '../../helpers/misc-helpers';

const updateAmountInput = amt => {
  store.dispatch({
    type: 'UPDATE_AMOUNT_INPUT',
    payload: { amt: amt },
  });
};

const updateNoteInput = evt => {
  store.dispatch({
    type: 'UPDATE_NOTE_INPUT',
    payload: { note: evt.target.value },
  });
};

const updateCategoryInput = (id, evt) => {
  store.dispatch({
    type: 'UPDATE_CATEGORY_INPUT',
    payload: { cat_id: id },
  });
};

const removeTransaction = id => {
  store.dispatch({
    type: 'REMOVE_TRANSACTION',
    payload: {
      id: id,
    },
  });
};

const getISODate = dateObj => {
  return dateObj.toISOString().slice(0, 10);
};

const adjustDate = delta => {
  const dateObj = new Date(store.getState().capture.dateInput);
  const newDate = new Date(dateObj.getTime() + delta * 8.64e7);
  store.dispatch({
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: getISODate(newDate),
    },
  });
};

const setDateToToday = () => {
  const today = new Date();
  let msOffsetFromUTC = today.getTimezoneOffset() * 6e4;
  store.dispatch({
    type: 'UPDATE_DATE_INPUT',
    payload: {
      date: new Date(today - msOffsetFromUTC).toISOString().slice(0, 10),
    },
  });
};

const addTransaction = () => {
  const captured = store.getState().capture;
  const newTransaction = {
    amt: captured.amountInput,
    date: captured.dateInput,
    note: captured.noteInput,
    cat_id: captured.categoryInput,
  };
  store.dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
};

const getCapturedAmountFromStore = () => {
  return store.getState().capture.amountInput;
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  capture: state.capture,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  updateAmountInput,
  updateNoteInput,
  updateCategoryInput,
  addTransaction,
  adjustDate,
  getCapturedAmountFromStore,
  setDateToToday,
  clearState() {
    dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
  },
});

export class Capture extends React.Component {
  state = {
    isCaptureVisible: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  hideCaptureModal = () => {
    this.setState({
      isCaptureVisible: false,
    });
  };

  showCaptureModal = () => {
    this.setState({
      isCaptureVisible: true,
    });
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 27: // escape
        this.hideCaptureModal();
        e.preventDefault();
        break;
      case 32: // spacebar
        !this.state.isCaptureVisible && e.preventDefault();
        this.showCaptureModal();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      capture,
      categories,
      addTransaction,
      updateAmountInput,
      updateNoteInput,
      updateCategoryInput,
      clearState,
      transactions,
    } = this.props;
    const transactionsByDate = groupByProperty(transactions, 'date');
    return (
      <div>
        <div className={styles.captureContainer}>
          {this.state.isCaptureVisible &&
            <CaptureModal
              date={capture.dateInput}
              amt={capture.amountInput}
              note={capture.noteInput}
              cat_id={capture.categoryInput}
              updateAmountInput={updateAmountInput}
              handleNoteChange={updateNoteInput}
              updateCategoryInput={updateCategoryInput}
              getCapturedAmountFromStore={getCapturedAmountFromStore}
              addTransaction={addTransaction}
              adjustDate={adjustDate}
              categories={categories}
              setDateToToday={setDateToToday}
            />}

          <div className={styles.transactionListContainer}>
            <TransactionList
              transactionsByDate={transactionsByDate}
              categories={categories}
              removeTransaction={removeTransaction}
            />
          </div>
          <div className={styles.categorySummaryContainer}>
            <CategorySummary
              transactions={this.props.transactions}
              categories={categories}
            />
          </div>
        </div>
        <button onClick={clearState}>Clear state</button>
        <pre>
          {JSON.stringify(store.getState(), null, '  ')}
        </pre>
      </div>
    );
  }
}

export const CaptureContainer = connect(mapStateToProps, mapDispatchToProps)(
  Capture
);
