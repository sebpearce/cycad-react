import React from 'react';
import { connect } from 'react-redux';

export const Settings = () => (
  <div>
    <h2>Settings</h2>
  </div>
);

export const SettingsContainer = connect(store => {
  return {
    transactions: store.transactions,
  };
})(Settings);
