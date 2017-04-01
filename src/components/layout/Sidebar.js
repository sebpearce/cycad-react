import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.css';
import Icon from '../Icon';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <NavLink exact to="/" activeClassName={styles.selected}>
            <li className={styles.section}>
              <div className={styles.labelAndIcon}>
                <div className={styles.iconContainer}>
                  <Icon id="inbox" />
                </div>
                <div className={styles.labelContainer}>
                  Capture
                </div>
              </div>
            </li>
          </NavLink>
          <NavLink to="/overview" activeClassName={styles.selected}>
            <li className={styles.section}>
              <div className={styles.labelAndIcon}>
                <div className={styles.iconContainer}>
                  <Icon id="analysis" />
                </div>
                <div className={styles.labelContainer}>
                  Overview
                </div>
              </div>
            </li>
          </NavLink>
          <NavLink to="/budget" activeClassName={styles.selected}>
            <li className={styles.section}>
              <div className={styles.labelAndIcon}>
                <div className={styles.iconContainer}>
                  <Icon id="dollar" />
                </div>
                <div className={styles.labelContainer}>
                  Budget
                </div>
              </div>
            </li>
          </NavLink>
          <NavLink to="/settings" activeClassName={styles.selected}>
            <li className={styles.section}>
              <div className={styles.labelAndIcon}>
                <div className={styles.iconContainer}>
                  <Icon id="settings" />
                </div>
                <div className={styles.labelContainer}>
                  Settings
                </div>
              </div>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
