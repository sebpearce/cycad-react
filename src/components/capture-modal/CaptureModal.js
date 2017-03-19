import React from 'react';
// import { NavLink } from 'react-router-dom';
import styles from './CaptureModal.css';

export const CaptureModal = () => {
  return (
    <div>
      <div className={styles.captureOverlay}>
        <div className={styles.captureContainer}>
          <div className={styles.capture}>
            <div className={styles.tips}>
              {'[ and ] to change day, { and } to change week'}
            </div>
            <div className={styles.dateDisplay}>
              Wednesday, 17 September 2016
            </div>
            <div className={styles.datePicker}>
              <div className={styles.datePickerCell}>M</div>
              <div className={styles.datePickerCell}>T</div>
              <div className={styles.datePickerCell}>W</div>
              <div className={styles.datePickerCell}>T</div>
              <div className={styles.datePickerCell}>F</div>
              <div className={styles.datePickerCell}>S</div>
              <div className={styles.datePickerCell}>S</div>
            </div>
            <div className={styles.pickersContainer}>
              <div className={styles.categoryPicker}>
                <div className={styles.categoryPickerLabel}>
                  {'Category'}
                </div>
                <input
                  type="text"
                  tabIndex="1"
                  autoFocus="true"
                  className={styles.categoryPickerInput}
                />
              </div>
              <div className={styles.amountPicker}>
                <div className={styles.amountPickerLabel}>{'Amount'}</div>
                <input
                  type="text"
                  tabIndex="2"
                  className={styles.amountPickerInput}
                />
              </div>
            </div>
            <div className={styles.categoryOptions}>
              <div className={styles.categoryOptionsItem}>{'category'}</div>
              <div className={styles.categoryOptionsItem}>{'category'}</div>
              <div className={styles.categoryOptionsItem}>{'category'}</div>
              <div className={styles.categoryOptionsItem}>{'category'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
