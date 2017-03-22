import React from 'react';
import styles from './CaptureModal.css';
import DatePicker from './DatePicker';
import AmountInput from './AmountInput';
import CategoryInput from './CategoryInput';
import CategorySelect from './CategorySelect';

export class CaptureModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  state = {
    visibleItems: [],
    selectedItem: 0,
    categoryInput: '',
    amountInput: '',
    isVisible: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  processRawInput = str => {
    return this.stripDecimalsAfterTwoPlaces(
      this.stripInitialZeros(this.stripNonNumericCharacters(str))
    );
  };

  stripNonNumericCharacters = x => {
    return x.replace(/[^0-9.]/g, '');
  };

  stripInitialZeros = x => {
    return x.replace(/^0+([0-9])/, '$1');
  };

  stripDecimalsAfterTwoPlaces = x => {
    return x.replace(/(\.\d{2}).+$/, '$1');
  };

  handleAmountStringChange = e => {
    const visibleInput = e.target.value;
    const strippedInput = this.processRawInput(visibleInput);
    console.log('Setting local amountInput to', strippedInput);
    this.setState({
      amountInput: strippedInput,
    });
    console.log('Updating amountInput as', strippedInput);
    this.props.updateAmountInput(strippedInput);
  };

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
    this.props.updateCategoryInput(
      visibleItems.length > 0 ? visibleItems[0].id : ''
    );
  };

  handleEnter = () => {
    this.props.addTransaction();
    this.setState({
      amountInput: '',
    });
    this.props.updateAmountInput('');
  };

  handleMouseOver = (i, id, event) => {
    this.props.updateCategoryInput(id);
    this.setState({
      selectedItem: i,
    });
  };

  handleFocus = e => {
    e.target.select();
  };

  incrementSelectedItem = delta => {
    const result = this.state.selectedItem + delta;
    if (result < 0 || result >= this.state.visibleItems.length) return;
    this.setState({
      selectedItem: result,
    });
    this.props.updateCategoryInput(this.state.visibleItems[result].id);
  };

  filterVisibleItems = (searchString, items) => {
    if (!searchString) {
      return [];
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(searchString.toLowerCase()));
  };

  focusAmountInput = () => {
    this.refs.amountInputComponent.refs.amountInput.focus();
  };

  focusCategoryInput = () => {
    this.refs.categoryInputComponent.refs.categoryInput.focus();
  };

  handleKeyDown = evt => {
    switch (evt.keyCode) {
      case 9: // tab
        if (
          document.activeElement ===
          this.refs.amountInputComponent.refs.amountInput
        ) {
          this.focusCategoryInput();
        } else {
          this.focusAmountInput();
        }
        evt.preventDefault();
        break;
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
  };

  render() {
    const props = this.props;

    return (
      <div>
        <div className={styles.captureOverlay}>
          <div className={styles.captureContainer}>
            <div className={styles.capture}>
              <DatePicker date={props.date} />
              <div className={styles.pickersContainer}>
                <CategoryInput
                  categoryInput={this.state.categoryInput}
                  handleSearchStringChange={this.handleSearchStringChange}
                  handleFocus={this.handleFocus}
                  ref="categoryInputComponent"
                />
                <AmountInput
                  amountInput={this.state.amountInput}
                  handleAmountStringChange={this.handleAmountStringChange}
                  handleFocus={this.handleFocus}
                  ref="amountInputComponent"
                />
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
