import React from 'react';
import styles from './CaptureModal.css';

class AmountInput extends React.Component {
  render() {
    return (
      <div className={styles.amountPicker}>
        <label>{'Amount'}</label>
        <input
          type="text"
          className={styles.amountPickerInput}
          onChange={this.props.handleAmountStringChange}
          value={this.props.amountInput}
          ref="amountInput"
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

export default AmountInput;
