import React from 'react';
import styles from './CaptureModal.css';

const CategoryItem = ({ name, className, handleMouseOver }) => {
  return <div className={className} onMouseOver={handleMouseOver}>{name}</div>;
};

const CategorySelect = props => {
  return (
    <div className={styles.categorySelect}>
      {props.items.map((cat, i) => {
        let className = props.selectedItem === i
          ? styles.selectedItem
          : styles.categorySelectItem;
        return (
          <CategoryItem
            className={className}
            name={cat.name}
            key={cat.id}
            handleMouseOver={props.handleMouseOver.bind(this, i, cat.id)}
          />
        );
      })}
    </div>
  );
};

export default CategorySelect;
