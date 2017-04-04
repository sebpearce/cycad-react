import React from 'react';
import { connect } from 'react-redux';

export const Budget = () => (
  <div>
    <h2>Budget</h2>
  </div>
);

export const BudgetContainer = connect(store => {
  return {
    transactions: store.transactions,
  };
})(Budget);
