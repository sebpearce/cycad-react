import React from 'react';
import { connect } from 'react-redux';
import { CaptureModal } from '../capture-modal/CaptureModal';
import { store } from '../../store';

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
  clearState() {
    dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
  },
});

export class Capture extends React.Component {
  state = {
    isCaptureVisible: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeyDown,
      false
    );
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
    } = this.props;
    return (
      <div>
        {this.state.isCaptureVisible &&
          <CaptureModal
            date={capture.dateInput}
            amt={capture.amountInput}
            note={capture.noteInput}
            cat_id={capture.categoryInput}
            updateAmountInput={updateAmountInput}
            handleNoteChange={updateNoteInput}
            updateCategoryInput={updateCategoryInput}
            addTransaction={addTransaction}
            adjustDate={adjustDate}
            categories={categories}
          />}

        <input type="text" onChange={updateAmountInput} />
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
  }
}

export const CaptureContainer = connect(mapStateToProps, mapDispatchToProps)(
  Capture
);
