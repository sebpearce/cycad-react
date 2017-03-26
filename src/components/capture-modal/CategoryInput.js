import React from 'react';
import styles from './CaptureModal.css';

class CategoryInput extends React.Component {
  render() {
    return (
      <div className={styles.categoryPicker}>
        <label>{'Category'}</label>
        <input
          type="text"
          autoFocus="true"
          className={styles.categoryPickerInput}
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
