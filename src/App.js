import React, { Component } from 'react';
import styles from './App.css';
import { Route } from 'react-router-dom';
import {
  Sidebar,
  CaptureContainer,
  BudgetContainer,
  OverviewContainer,
  SettingsContainer,
} from './components/layout';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.mainContainer}>
          <Sidebar />
          <div className={styles.content}>
            <Route exact path="/" component={CaptureContainer} />
            <Route path="/overview" component={OverviewContainer} />
            <Route path="/budget" component={BudgetContainer} />
            <Route path="/settings" component={SettingsContainer} />
          </div>
        </div>
        {/* footer could go here */}
      </div>
    );
  }
}
