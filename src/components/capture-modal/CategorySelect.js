import React from 'react';
import styles from './CaptureModal.css';

const CategoryItem = ({ name }) => {
  return <div className={styles.categorySelectItem}>{name}</div>;
};

const CategorySelect = ({ categories }) => {
  return (
    <div className={styles.categorySelect}>
      {
        categories.map(cat => <CategoryItem name={cat.name} key={cat.id} />)
      }
    </div>
  );
};

export default CategorySelect;
