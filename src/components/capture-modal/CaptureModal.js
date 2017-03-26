import React from 'react';
import styles from './CaptureModal.css';
import DatePicker from './DatePicker';
import AmountInput from './AmountInput';
import CategoryInput from './CategoryInput';
import CategorySelect from './CategorySelect';
import { Motion, spring } from 'react-motion';
import { formatWithCommas } from '../../helpers/currency-helpers';
import { pipe } from '../../helpers/misc-helpers';
import { Howl } from 'howler';
import plinksrc from '../../audio/plink-1.mp3';
import incomeSoundSrc from '../../audio/income.mp3';

export class CaptureModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      visibleItems: [],
      selectedItem: 0,
      categoryInput: '',
      amountInput: '0.00',
      categoryWarning: false,
      amountWarning: false,
    };

    this.plink = new Howl({ src: plinksrc });
    this.incomeSound = new Howl({ src: incomeSoundSrc });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  makePositive = x =>
    pipe(
      x,
      this.stripNonNumericCharacters,
      this.insertDecimal,
      formatWithCommas,
    );

  processRawInput = x =>
    pipe(
      x,
      this.stripNonNumericCharacters,
      this.insertDecimal,
      formatWithCommas,
      this.prependNegativeSign,
    );

  stripNonNumericCharacters = x => {
    return x.replace(/[^0-9]/g, '');
  };

  insertDecimal = x => {
    return x ? (parseInt(x, 10) / 100).toFixed(2) : '0.00';
  };

  prependNegativeSign = x => {
    return '-'.concat(x);
  }

  validateAmount = x => x !== '0.00' && /^-?[0-9]+.[0-9]{2}$/.test(x);

  handleAmountStringChange = e => {
    const visibleInput = e.target.value;
    const strippedInput = this.processRawInput(visibleInput);
    this.setState({
      amountInput: strippedInput,
    });
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
    if (!this.props.cat_id) {
      this.setState({
        categoryWarning: true,
        amountWarning: !this.validateAmount(this.props.amt),
      });
      this.focusCategoryInput();
      return false;
    }
    if (!this.validateAmount(this.props.amt)) {
      this.setState({
        amountWarning: true,
        categoryWarning: !this.props.cat_id,
      });

      this.focusAmountInput();
      return false;
    }
    this.props.addTransaction();
    this.setState({
      amountInput: '',
      categoryInput: '',
      visibleItems: [],
      categoryWarning: false,
      amountWarning: false,
    });
    this.props.updateAmountInput('');
    this.props.updateCategoryInput('');
    this.focusCategoryInput();
    this.plink.play();
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
    this.amountInputComponent.amountInput.focus();
  };

  focusCategoryInput = () => {
    this.categoryInputComponent.categoryInput.focus();
  };

  handleKeyDown = evt => {
    const isAmountInputActive = document.activeElement ===
      this.amountInputComponent.amountInput;
    const isCategoryInputActive = document.activeElement ===
      this.categoryInputComponent.categoryInput;

    switch (evt.keyCode) {
      case 9: // tab
        if (isAmountInputActive) {
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
      case 78: // n
        if (evt.ctrlKey) this.incrementSelectedItem(1);
        break;
      case 80: // p
        if (evt.ctrlKey) this.incrementSelectedItem(-1);
        break;
      case 187: // +
        if (evt.shiftKey) {
          const positiveAmt = this.makePositive(this.state.amountInput);
          this.setState({
            amountInput: positiveAmt,
            amountWarning: false,
          })
          this.props.updateAmountInput(positiveAmt);
          this.incomeSound.play();
          evt.preventDefault();
          // turn green
        }
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
    if (
      !evt.ctrlKey &&
      evt.keyCode >= 65 &&
      evt.keyCode <= 90 &&
      !isCategoryInputActive
    ) {
      this.focusCategoryInput();
    }
    if (
      !evt.ctrlKey &&
      evt.keyCode >= 48 &&
      evt.keyCode <= 57 &&
      !isAmountInputActive
    ) {
      this.focusAmountInput();
    }
    // 48-57 digits, 65-90 alpha
  };

  render() {
    const props = this.props;

    return (
      <div>
        <div className={styles.captureOverlay}>
          <Motion style={{ x: spring(Number(this.props.amt) > 0 ? 1.4 : 1) }}>
            {({ x }) => (
              <div className={styles.captureContainer}>
                <div className={styles.capture}>
                  <DatePicker date={props.date} adjustDate={props.adjustDate} />
                  <div className={styles.pickersContainer}>
                    <CategoryInput
                      categoryInput={this.state.categoryInput}
                      handleSearchStringChange={this.handleSearchStringChange}
                      handleFocus={this.handleFocus}
                      categoryWarning={this.state.categoryWarning}
                      ref={input => {
                        this.categoryInputComponent = input;
                      }}
                    />
                    <AmountInput
                      amountAsString={this.state.amountInput}
                      handleAmountStringChange={this.handleAmountStringChange}
                      handleFocus={this.handleFocus}
                      amountWarning={this.state.amountWarning}
                      ref={input => {
                        this.amountInputComponent = input;
                      }}
                    />
                  </div>
                  <CategorySelect
                    items={this.state.visibleItems}
                    selectedItem={this.state.selectedItem}
                    handleMouseOver={this.handleMouseOver.bind(this)}
                  />
                </div>
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

CaptureModal.propTypes = {
  date: React.PropTypes.string.isRequired,
  amt: React.PropTypes.string.isRequired,
  note: React.PropTypes.string.isRequired,
  cat_id: React.PropTypes.string.isRequired,
  updateAmountInput: React.PropTypes.func.isRequired,
  handleNoteChange: React.PropTypes.func.isRequired,
  updateCategoryInput: React.PropTypes.func.isRequired,
  addTransaction: React.PropTypes.func.isRequired,
  adjustDate: React.PropTypes.func.isRequired,
  categories: React.PropTypes.array.isRequired,
  getCapturedAmountFromStore:React.PropTypes.func.isRequired,
}
