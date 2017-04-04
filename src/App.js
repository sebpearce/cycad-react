import React, { Component } from 'react';
import styles from './App.css';
import { Route } from 'react-router-dom';
import IconDefs from './components/IconDefs';
import CaptureContainer from './components/capture/CaptureContainer';
import BudgetContainer from './components/budget/BudgetContainer';
import OverviewContainer from './components/overview/OverviewContainer';
import SettingsContainer from './components/settings/SettingsContainer';
import Sidebar from './components/sidebar/Sidebar';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <IconDefs />
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
