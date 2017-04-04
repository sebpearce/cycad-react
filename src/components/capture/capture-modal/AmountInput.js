import React from 'react';
import styles from './CaptureModal.css';
import {
  formatAsCurrency,
  determineNumericValue,
} from '../../../helpers/currency-helpers';

class AmountInput extends React.Component {
  render() {
    let suffix = '';
    if (this.props.amountWarning) {
      suffix = 'Warning';
    } else if (determineNumericValue(this.props.amount) > 0) {
      suffix = 'Positive';
    }
    const className = styles['amountPickerInput' + suffix];

    return (
      <div className={styles.amountPicker}>
        <label>{'Amount'}</label>
        <input
          type="text"
          className={className}
          onChange={this.props.handleAmountStringChange}
          value={formatAsCurrency(this.props.amount, {
            plus: true,
            minus: false,
          })}
          ref={input => {
            this.amountInput = input;
          }}
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

AmountInput.propTypes = {
  amount: React.PropTypes.number.isRequired,
  handleAmountStringChange: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  amountWarning: React.PropTypes.bool.isRequired,
};

export default AmountInput;
