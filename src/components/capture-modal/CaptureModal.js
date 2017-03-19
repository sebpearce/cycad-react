import React from 'react';
import styles from './CaptureModal.css';
import DatePicker from './DatePicker';
import CategorySelect from './CategorySelect';

export class CaptureModal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      // [
      case 219:
        evt.preventDefault();
        if (evt.shiftKey) {
          this.props.adjustDate(-7);
        } else {
          this.props.adjustDate(-1);
        }
        break;
      // ]
      case 221:
        evt.preventDefault();
        if (evt.shiftKey) {
          this.props.adjustDate(7);
        } else {
          this.props.adjustDate(1);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const props = this.props;

    return (
      <div>
        <div className={styles.captureOverlay}>
          <div className={styles.captureContainer}>
            <div className={styles.capture}>
              <DatePicker date={props.date} />
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
                    onChange={props.handleCategoryChange}
                  />
                </div>
                <div className={styles.amountPicker}>
                  <div className={styles.amountPickerLabel}>{'Amount'}</div>
                  <input
                    type="text"
                    tabIndex="2"
                    className={styles.amountPickerInput}
                    onChange={props.handleAmountChange}
                  />
                </div>
              </div>
              <CategorySelect categories={props.categories}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
