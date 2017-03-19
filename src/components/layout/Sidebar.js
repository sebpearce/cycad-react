import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <NavLink exact to="/" activeClassName={styles.selected}>
            <li className={styles.section}>Capture</li>
          </NavLink>
          <NavLink to="/overview" activeClassName={styles.selected}>
            <li className={styles.section}>Overview</li>
          </NavLink>
          <NavLink to="/budget" activeClassName={styles.selected}>
            <li className={styles.section}>Budget</li>
          </NavLink>
          <NavLink to="/settings" activeClassName={styles.selected}>
            <li className={styles.section}>Settings</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
