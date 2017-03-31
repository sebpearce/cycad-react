import React from 'react';
import styles from './IconDefs.css';

const Icon = props => {
  return (
    <svg className={styles.icon}>
      <use xlinkHref={`#${props.id}`} />
    </svg>
  );
};

export default Icon;
