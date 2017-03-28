import * as subject from './currency-helpers';

describe('formatWithCommas', () => {
  it('formats a million dollars correctly', () => {
    const x = '1000000.00';
    expect(subject.formatWithCommas(x)).toEqual('1,000,000.00');
  });

  it('handles negatives', () => {
    const x = '-5634.12';
    expect(subject.formatWithCommas(x)).toEqual('-5,634.12');
  });

  it('handles plus sign', () => {
    const x = '+5634.12';
    expect(subject.formatWithCommas(x)).toEqual('+5,634.12');
  });
});

describe('addPlusSignIfPositive', () => {
  it('works', () => {
    const x = '1234.00';
    expect(subject.addPlusSignIfPositive(x)).toEqual('+1234.00');
  });
});
