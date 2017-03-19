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
  // TODO: Handle onClick for direct clicks on days
  return (
    <div>
      <div className={styles.tips}>
        {'[ and ] to change day, { and } to change week'}
      </div>
      <div className={styles.dateDisplay}>
        {formatLongDate(props.date)}
      </div>
      <Picker selected={getDayOfWeek(props.date)} />
    </div>
  );
};

export default DatePicker;
