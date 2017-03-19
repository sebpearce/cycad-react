import React from 'react';
import styles from './CaptureModal.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const formatLongDate = isoDate => {
  const dateObj = new Date(isoDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

const getDayOfWeek = isoDate => {
  const dateObj = new Date(isoDate);
  return dateObj.getDay();
};

const Picker = ({ selected }) => {
  const isSelected = day => {
    return day === selected
      ? styles.datePickerCellSelected
      : styles.datePickerCell;
  };

  return (
    <div className={styles.datePicker}>
      <div className={isSelected(1)}>M</div>
      <div className={isSelected(2)}>T</div>
      <div className={isSelected(3)}>W</div>
      <div className={isSelected(4)}>T</div>
      <div className={isSelected(5)}>F</div>
      <div className={isSelected(6)}>S</div>
      <div className={isSelected(0)}>S</div>
    </div>
  );
};

const DatePicker = props => {
  return (
    <div>
      <div className={styles.dateDisplay}>
        {formatLongDate(props.date)}
      </div>
      <Picker selected={getDayOfWeek(props.date)} />
    </div>
  );
};

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
              <div className={styles.tips}>
                {'[ and ] to change day, { and } to change week'}
              </div>
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
  }
}
