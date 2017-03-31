import React from 'react';
import styles from './CategorySummary.css';
import { formatAsCurrency } from '../../helpers/currency-helpers';
import { getCategoryName } from '../../helpers/misc-helpers';
import { groupByProperty } from '../../helpers/misc-helpers';
import { getTodaysDateISO, getNMonthsAgoISO } from '../../helpers/date-helpers';

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
        { formatAsCurrency(props.amt, {plus: true, minus: true}) }
      </div>
    </div>
  );
};

class CategorySummary extends React.Component {
  render() {
    const props = this.props;
    const transactions = props.transactions;
    const categories = props.categories;
    const today = getTodaysDateISO();
    const firstOfThisMonth = getNMonthsAgoISO(1);
    const thisMonthsTransactions = transactions.filter(
      d => d.date <= today && d.date >= firstOfThisMonth
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

    return (
      <div className={styles.categorySummaryContainer}>
        {Object.keys(totalsForEachCategory).map(id => {
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
