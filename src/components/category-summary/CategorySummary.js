import React from 'react';
import styles from './CategorySummary.css';
import { formatAsCurrency } from '../../helpers/currency-helpers';
import { getCategoryName } from '../../helpers/misc-helpers';
import { groupByProperty } from '../../helpers/misc-helpers';
import {
  getFirstOfThisMonthISO,
  getLastOfThisMonthISO,
} from '../../helpers/date-helpers';

const CategorySummaryRow = props => {
  const amtClass = props.amt > 0
    ? styles.categorySummaryRowAmtPositive
    : styles.categorySummaryRowAmt;

  return (
    <div className={styles.categorySummaryRow}>
      <div className={styles.categorySummaryRowCat}>
        {props.categoryName}
      </div>
      <div className={amtClass}>
        {formatAsCurrency(props.amt, { plus: true, minus: true })}
      </div>
    </div>
  );
};

class CategorySummary extends React.Component {
  render() {
    const props = this.props;
    const transactions = props.transactions;
    const categories = props.categories;
    const lastOfThisMonth = getLastOfThisMonthISO();
    const firstOfThisMonth = getFirstOfThisMonthISO();
    const thisMonthsTransactions = transactions.filter(
      d => d.date <= lastOfThisMonth && d.date >= firstOfThisMonth
    );

    const thisMonthsTransactionsByCategory = groupByProperty(
      thisMonthsTransactions,
      'cat_id'
    );

    const totalsForEachCategory = Object.keys(
      thisMonthsTransactionsByCategory
    ).reduce(
      (acc, id) => {
        const out = {};
        out[id] = thisMonthsTransactionsByCategory[id].reduce(
          (total, currentItem) => {
            return total + Number(currentItem.amt);
          },
          0
        );
        return {
          ...acc,
          ...out,
        };
      },
      {}
    );
    console.log(totalsForEachCategory);

    const expenseCategoryKeysOrderedByAmount = Object.keys(
      totalsForEachCategory
    ).sort(
      (a, b) =>
        totalsForEachCategory[a] -
        totalsForEachCategory[b]
    ).filter(key => totalsForEachCategory[key] < 0);
    console.log(expenseCategoryKeysOrderedByAmount);

    return (
      <div className={styles.categorySummaryContainer}>
        <div className={styles.categorySummaryHeading}>This month so far</div>
        {expenseCategoryKeysOrderedByAmount.map(id => {
          return (
            <CategorySummaryRow
              key={id}
              amt={totalsForEachCategory[id]}
              categoryName={getCategoryName(categories, id)}
            />
          );
        })}
      </div>
    );
  }
}

CategorySummary.propTypes = {
  transactions: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
};

export default CategorySummary;
