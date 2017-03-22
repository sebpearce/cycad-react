import React from 'react';
import styles from './CaptureModal.css';

class CategoryInput extends React.Component {
  render() {
    // TODO: Handle onClick for direct clicks on days
    return (
      <div className={styles.categoryPicker}>
        <label>{'Category'}</label>
        <input
          type="text"
          autoFocus="true"
          className={styles.categoryPickerInput}
          onChange={this.props.handleSearchStringChange}
          value={this.props.categoryInput}
          ref="categoryInput"
          onFocus={this.props.handleFocus}
        />
      </div>
    );
  }
}

export default CategoryInput;
