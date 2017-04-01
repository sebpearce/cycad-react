import React from 'react';
import styles from './TransactionList.css';
import { formatLongDate } from '../../helpers/date-helpers';
import { formatAsCurrency } from '../../helpers/currency-helpers';
import { getCategoryName } from '../../helpers/misc-helpers';
import Icon from '../Icon';

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
      <div className={styles.transactionListRowDelete}>
        <div
          className={styles.transactionListRowDeleteIcon}
          onClick={() => {
            props.removeTransaction(props.row.id);
          }}
        >
          <Icon id="trash" />
        </div>
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
          removeTransaction={props.removeTransaction}
        />
      ))}
    </div>
  );
};

class TransactionList extends React.Component {
  scrollToBottom() {
    const scrollHeight = this.transactionList.scrollHeight;
    const height = this.transactionList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.transactionList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    const props = this.props;
    const dates = Object.keys(props.transactionsByDate).sort();
    const transactions = props.transactionsByDate;

    return (
      <div
        className={styles.transactionListContainer}
        ref={div => {
          this.transactionList = div;
        }}
      >
        <div className={styles.transactionListHeading}>All transactions</div>
        {dates.map(day => {
          return (
            <DayOfTransactions
              date={day}
              rows={transactions[day]}
              key={day}
              categories={props.categories}
              removeTransaction={props.removeTransaction}
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
