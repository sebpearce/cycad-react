import { pipe } from './misc-helpers';

// const stripNonNumericCharacters = x => {
//   return String(x).replace(/[^0-9]/g, '');
// };

// const insertDecimal = x => {
//   return x ? (parseInt(x, 10) / 100).toFixed(2) : '0.00';
// };



// export const addPlusSignIfPositive = x => {
//   const stripped = x.replace(/[^–[0-9].]/g, '');
//   return Number(stripped) > 0 ? '+'.concat(x) : x;
// };

export const formatWithCommas = x => {
  return String(x).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

const replaceMinusSignWithHyphen = s => {
  return String(s).replace(/–/, '-');
}

const makePositive = x => {
  return Math.abs(x);
}

const stripNonNumericCharacters = s => {
  return String(s).replace(/[^0-9-.]/g,'');
}

const convertToNumber = s => {
  return Number(s);
}

const convertToTwoDigitDecimalString = x => {
  return x.toFixed(2);
}

const prependMinusSign = x => {
  return '–'.concat(x);
}

const prependPlusSign = x => {
  return '+'.concat(x);
}

export const determineNumericValue = x => {
  if (typeof x === 'number') return x;
  return pipe(
    x,
    replaceMinusSignWithHyphen,
    stripNonNumericCharacters,
    convertToNumber,
  )
}

export const formatAsCurrency = (x, settings = {plus: false, minus: false}) => {
  const numericValue = determineNumericValue(x);
  let outputString = pipe(
    numericValue,
    makePositive,
    convertToTwoDigitDecimalString,
    formatWithCommas,
  );

  if (settings['plus'] && numericValue > 0) {
    outputString = prependPlusSign(outputString);
  } else if (settings['minus'] && numericValue < 0) {
    outputString = prependMinusSign(outputString);
  }
  return outputString;
}
