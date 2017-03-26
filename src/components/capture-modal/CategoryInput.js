import React from 'react';
import styles from './CaptureModal.css';

class CategoryInput extends React.Component {
  render() {
    const suffix = this.props.categoryWarning ? 'Warning' : '';
    const className = styles['categoryPickerInput' + suffix];

    return (
      <div className={styles.categoryPicker}>
        <label>{'Category'}</label>
        <input
          type="text"
          autoFocus="true"
          className={className}
          onChange={this.props.handleSearchStringChange}
          value={this.props.categoryInput}
          ref={(input) => { this.categoryInput = input; }}
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

export default CategoryInput;
