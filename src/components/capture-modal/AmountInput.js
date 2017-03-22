import React from 'react';
import styles from './CaptureModal.css';

const AmountInput = props => {
  // TODO: Handle onClick for direct clicks on days
  return (
    <div className={styles.amountPicker}>
      <div className={styles.amountPickerLabel}>{'Amount'}</div>
      <input
        type="text"
        tabIndex="2"
        className={styles.amountPickerInput}
        onChange={props.handleAmountStringChange}
        value={props.amountInput}
      />
    </div>
  );
};

export default AmountInput;
