import React from 'react';
import styles from './TransactionList.css';
import { formatLongDate } from '../../helpers/date-helpers';
import { formatAsCurrency } from '../../helpers/currency-helpers';
import { getCategoryName } from '../../helpers/misc-helpers';

const TransactionListRow = props => {
  const amtClass = props.row.amt > 0
    ? styles.transactionListRowAmtPositive
    : styles.transactionListRowAmt;

  return (
    <div className={styles.transactionListRow}>
      <div className={styles.transactionListRowCat}>
        {getCategoryName(props.categories, props.row.cat_id)}
      </div>
      <div className={amtClass}>
        {formatAsCurrency(props.row.amt, { plus: true, minus: true })}
      </div>
    </div>
  );
};

const DayOfTransactions = props => {
  return (
    <div className={styles.transactionListDay}>
      <div className={styles.transactionListDayDate}>
        {formatLongDate(props.date)}
      </div>
      {props.rows.map(row => (
        <TransactionListRow
          row={row}
          key={row.id}
          categories={props.categories}
        />
      ))}
    </div>
  );
};

class TransactionList extends React.Component {
  render() {
    const props = this.props;
    const dates = Object.keys(props.transactionsByDate).sort();
    const transactions = props.transactionsByDate;

    return (
      <div className={styles.transactionListContainer}>
        {dates.map(day => {
          return (
            <DayOfTransactions
              date={day}
              rows={transactions[day]}
              key={day}
              categories={props.categories}
            />
          );
        })}
      </div>
    );
  }
}

TransactionList.propTypes = {
  transactionsByDate: React.PropTypes.object.isRequired,
  categories: React.PropTypes.array.isRequired,
};

export default TransactionList;
