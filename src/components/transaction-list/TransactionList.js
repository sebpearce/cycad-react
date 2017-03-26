import React from 'react';
import styles from './TransactionList.css';
import { formatLongDate } from '../../helpers/date-helpers';
import { formatWithCommas } from '../../helpers/currency-helpers';

export const getCategoryName = (categories, id) => {
  return categories.find(cat => cat.id === id).name;
};

const TransactionListRow = props => {
  return (
    <div className={styles.transactionListRow}>
      <div className={styles.transactionListRowCat}>
        {getCategoryName(props.categories, props.row.cat_id)}
      </div>
      <div className={styles.transactionListRowAmt}>
        {formatWithCommas(props.row.amt)}
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
      {props.rows.map(row => <TransactionListRow row={row} key={row.id} categories={props.categories} />)}
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
            <DayOfTransactions date={day} rows={transactions[day]} key={day} categories={props.categories}/>
          );
        })}
      </div>
    );
  }
}

TransactionList.propTypes = {};

export default TransactionList;
