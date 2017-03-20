import React from 'react';
import styles from './CaptureModal.css';
import DatePicker from './DatePicker';
import CategorySelect from './CategorySelect';

export class CaptureModal extends React.Component {
  state = {
    visibleItems: [],
    selectedItem: 0,
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

  handleSearchStringChange = e => {
    this.filterVisibleItems(e.target.value, this.props.categories);
  };
  
  setSelectedItem = i => {
    this.setState({
      selectedItem: i,
    })
  }

  incrementSelectedItem = delta => {
    const result = this.state.selectedItem + delta;
    if (result < 0 || result >= this.state.visibleItems.length) return;
    this.setState({
      selectedItem: result,
    });
  };

  filterVisibleItems = (searchString, items) => {
    let result = !searchString
      ? []
      : items.filter(item =>
          item.name.toLowerCase().includes(searchString.toLowerCase()));
    this.setState({
      visibleItems: result,
      selectedItem: 0,
    });
  };

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      case 38:
        // up arrow
        evt.preventDefault();
        this.incrementSelectedItem(-1);
        break;
      case 40:
        // down arrow
        evt.preventDefault();
        this.incrementSelectedItem(1);
        break;
      case 219:
        // [
        evt.preventDefault();
        if (evt.shiftKey) {
          this.props.adjustDate(-7);
        } else {
          this.props.adjustDate(-1);
        }
        break;
      case 221:
        // ]
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
                  />
                </div>
                <div className={styles.amountPicker}>
                  <div className={styles.amountPickerLabel}>{'Amount'}</div>
                  <input
                    type="text"
                    tabIndex="2"
                    className={styles.amountPickerInput}
                    onChange={props.handleAmountChange}
                  />
                </div>
              </div>
              <CategorySelect
                items={this.state.visibleItems}
                selectedItem={this.state.selectedItem}
                setSelectedItem={this.setSelectedItem.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
