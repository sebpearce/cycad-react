import React from 'react';
import styles from './CategorySummary.css';
import { formatAsCurrency } from '../../helpers/currency-helpers';

const CategorySummaryTotal = props => {
  return (
    <div className={styles.totalContainer}>
      <div className={styles.totalLabel}>Total</div>
      <div className={styles.total}>{formatAsCurrency(props.total)}</div>
    </div>
  );
}

export default CategorySummaryTotal;
