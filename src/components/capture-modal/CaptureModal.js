import React from 'react';
import styles from './CaptureModal.css';
import DatePicker from './DatePicker';
import CategorySelect from './CategorySelect';

export class CaptureModal extends React.Component {
  state = {
    visibleItems: [],
    selectedItem: 0,
    categoryInput: '',
    amountInput: '',
    isVisible: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeyDown.bind(this),
      false
    );
  }

  handleAmountStringChange = e => {
    this.setState({
      amountInput: e.target.value,
    })
    this.props.updateAmountInput(e.target.value);
  }

  handleSearchStringChange = e => {
    const visibleItems = this.filterVisibleItems(
      e.target.value,
      this.props.categories
    );
    this.setState({
      visibleItems: visibleItems,
      selectedItem: 0,
      categoryInput: e.target.value,
    });
    this.props.handleCategoryChange(
      visibleItems.length > 0 ? visibleItems[0].id : ''
    );
  };
  
  handleEnter = e => {
    this.props.addTransaction();
    this.setState({
      amountInput: '',
    })
    this.props.updateAmountInput('');
  };

  handleMouseOver = (i, id, event) => {
    this.props.handleCategoryChange(id);
    this.setState({
      selectedItem: i,
    });
  };

  incrementSelectedItem = delta => {
    const result = this.state.selectedItem + delta;
    if (result < 0 || result >= this.state.visibleItems.length) return;
    this.setState({
      selectedItem: result,
    });
    this.props.handleCategoryChange(this.state.visibleItems[result].id);
  };

  filterVisibleItems = (searchString, items) => {
    if (!searchString) {
      return [];
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(searchString.toLowerCase()));
  };

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      case 13: // enter
        this.handleEnter();
        evt.preventDefault();
        break;
      case 38: // up arrow
        evt.preventDefault();
        this.incrementSelectedItem(-1);
        break;
      case 40: // down arrow
        evt.preventDefault();
        this.incrementSelectedItem(1);
        break;
      case 219: // [
        evt.preventDefault();
        if (evt.shiftKey) {
          this.props.adjustDate(-7);
        } else {
          this.props.adjustDate(-1);
        }
        break;
      case 221: // ]
        evt.preventDefault();
        if (evt.shiftKey) {
          this.props.adjustDate(7);
        } else {
          this.props.adjustDate(1);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const props = this.props;

    return (
      <div>
        <div className={styles.captureOverlay}>
          <div className={styles.captureContainer}>
            <div className={styles.capture}>
              <DatePicker date={props.date} />
              <div className={styles.pickersContainer}>
                <div className={styles.categoryPicker}>
                  <div className={styles.categoryPickerLabel}>
                    {'Category'}
                  </div>
                  <input
                    type="text"
                    tabIndex="1"
                    autoFocus="true"
                    className={styles.categoryPickerInput}
                    onChange={this.handleSearchStringChange}
                    value={this.state.categoryInput}
                  />
                </div>
                <div className={styles.amountPicker}>
                  <div className={styles.amountPickerLabel}>{'Amount'}</div>
                  <input
                    type="text"
                    tabIndex="2"
                    className={styles.amountPickerInput}
                    onChange={this.handleAmountStringChange}
                    value={this.state.amountInput}
                  />
                </div>
              </div>
              <CategorySelect
                items={this.state.visibleItems}
                selectedItem={this.state.selectedItem}
                handleMouseOver={this.handleMouseOver.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
