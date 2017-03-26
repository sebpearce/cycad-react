import React from 'react';
import styles from './CaptureModal.css';

class AmountInput extends React.Component {
  stripNegativeSign(x) {
    return x.replace(/-/, '');
  }

  stripCommas(x) {
    return x.replace(/,/, '');
  }

  render() {
    let suffix = '';
    if (this.props.amountWarning) {
      suffix = 'Warning';
    } else if (Number(this.stripCommas(this.props.amountAsString)) > 0) {
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
          value={this.stripNegativeSign(this.props.amountAsString)}
          ref={(input) => { this.amountInput = input; }}
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

AmountInput.propTypes = {
  amountAsString: React.PropTypes.string.isRequired,
  handleAmountStringChange: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  amountWarning: React.PropTypes.bool.isRequired,
}

export default AmountInput;
