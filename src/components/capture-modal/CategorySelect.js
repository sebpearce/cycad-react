import React from 'react';
import styles from './CaptureModal.css';

const CategoryItem = ({ name, className, handleMouseOver }) => {
  return <div className={className} onMouseOver={handleMouseOver}>{name}</div>;
}

class CategorySelect extends React.Component {

  handleMouseOver(i, event) {
    console.log('Set selected item to', i);
    this.props.setSelectedItem(i);
  }
  
  render() {
    return (
      <div className={styles.categorySelect}>
        {this.props.items.map((cat, i) => {
          let className = this.props.selectedItem === i
            ? styles.selectedItem
            : styles.categorySelectItem;
          return (
            <CategoryItem
              className={className}
              name={cat.name}
              key={cat.id}
              handleMouseOver={this.handleMouseOver.bind(this, i)}
            />
          );
        })}
      </div>
    );
  }
}

export default CategorySelect;
