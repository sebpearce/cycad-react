import React from 'react';
import styles from './CaptureModal.css';

class AmountInput extends React.Component {
  render() {
    const suffix = this.props.amountWarning ? 'Warning' : '';
    const className = styles['amountPickerInput' + suffix];

    return (
      <div className={styles.amountPicker}>
        <label>{'Amount'}</label>
        <input
          type="text"
          className={className}
          onChange={this.props.handleAmountStringChange}
          value={this.props.amountInput}
          ref={(input) => { this.amountInput = input; }}
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

AmountInput.propTypes = {
  amountInput: React.PropTypes.string.isRequired,
  handleAmountStringChange: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  amountWarning: React.PropTypes.bool.isRequired,
}

export default AmountInput;
