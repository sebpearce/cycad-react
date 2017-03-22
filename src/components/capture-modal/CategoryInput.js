import React from 'react';
import styles from './CaptureModal.css';

const CategoryInput = props => {
  // TODO: Handle onClick for direct clicks on days
  return (
    <div className={styles.categoryPicker}>
      <div className={styles.categoryPickerLabel}>
        {'Category'}
      </div>
      <input
        type="text"
        tabIndex="1"
        autoFocus="true"
        className={styles.categoryPickerInput}
        onChange={props.handleSearchStringChange}
        value={props.categoryInput}
      />
    </div>
  );
};

export default CategoryInput;
