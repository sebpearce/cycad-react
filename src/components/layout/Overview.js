import React from 'react';
import { connect } from 'react-redux';

export const Overview = () => (
  <div>
    <h2>Overview</h2>
  </div>
);

export const OverviewContainer = connect(store => {
  return {
    transactions: store.transactions,
  };
})(Overview);
