import React from 'react';
import styles from './CaptureModal.css';

const CategoryItem = ({ name, className }) => {
  return <div className={className}>{name}</div>;
};

const CategorySelect = ({ items, selectedItem }) => {
  return (
    <div className={styles.categorySelect}>
      {items.map((cat, idx) => {
        let className = selectedItem === idx
          ? styles.selectedItem
          : styles.categorySelectItem;
        return (
          <CategoryItem className={className} name={cat.name} key={cat.id} />
        );
      })}
    </div>
  );
};

export default CategorySelect;
