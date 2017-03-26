import React from 'react';
import styles from './CaptureModal.css';
import { formatLongDate } from '../../helpers/date-helpers';

const getDayOfWeek = isoDate => {
  const dateObj = new Date(isoDate);
  return dateObj.getDay();
};

const Picker = ({ selected, adjustDate }) => {
  const isSelected = day => {
    return day === selected
      ? styles.datePickerCellSelected
      : styles.datePickerCell;
  };
  
  const offset = Math.abs(selected - (selected === 0 ? 7 : 0));
  return (
    <div className={styles.datePicker}>
      <div className={isSelected(1)} onClick={()=>{adjustDate(1 - offset)}}>M</div>
      <div className={isSelected(2)} onClick={()=>{adjustDate(2 - offset)}}>T</div>
      <div className={isSelected(3)} onClick={()=>{adjustDate(3 - offset)}}>W</div>
      <div className={isSelected(4)} onClick={()=>{adjustDate(4 - offset)}}>T</div>
      <div className={isSelected(5)} onClick={()=>{adjustDate(5 - offset)}}>F</div>
      <div className={isSelected(6)} onClick={()=>{adjustDate(6 - offset)}}>S</div>
      <div className={isSelected(0)} onClick={()=>{adjustDate(7 - offset)}}>S</div>
    </div>
  );
};

const DatePicker = props => {
  return (
    <div>
      <div className={styles.tips}>
        {'[ and ] to change day, { and } to change week'}
      </div>
      <div className={styles.dateDisplay}>
        {formatLongDate(props.date)}
      </div>
      <Picker selected={getDayOfWeek(props.date)} adjustDate={props.adjustDate} />
    </div>
  );
};

DatePicker.propTypes = {
  date: React.PropTypes.string.isRequired,
  adjustDate: React.PropTypes.func.isRequired,
}

export default DatePicker;
