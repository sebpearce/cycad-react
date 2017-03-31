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

// describe('addPlusSignIfPositive', () => {
//   it('works', () => {
//     const x = '1234.00';
//     expect(subject.addPlusSignIfPositive(x)).toEqual('+1234.00');
//   });
// });

describe('formatAsCurrency', () => {
  describe('when comma-formatted values are passed in', () => {
    const settings = {
      plus: true,
      minus: true,
    };

    it('handles negatives', () => {
      const x = '–1,234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });

    it('handles positives', () => {
      const x = '1,234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles positives with plus sign', () => {
      const x = '+1,234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });
  });

  describe('when numbers are passed in', () => {
    const settings = {
      plus: true,
      minus: true,
    };

    it('handles negative numbers', () => {
      const x = -1234;
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });

    it('handles negative one-digit decimals', () => {
      const x = -1234.5;
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.50');
    });

    it('handles negative two-digit decimals', () => {
      const x = -1234.56;
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.56');
    });

    it('handles positive numbers', () => {
      const x = 1234;
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles positive one-digit decimals', () => {
      const x = 1234.5;
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.50');
    });

    it('handles positive two-digit decimals', () => {
      const x = 1234.56;
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.56');
    });
  });

  describe('when both the plus and minus setting are true', () => {
    const settings = {
      plus: true,
      minus: true,
    };

    it('handles positives', () => {
      const x = '1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles negatives', () => {
      const x = '-1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });

    it('handles positives without a decimal', () => {
      const x = '1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles negatives without a decimal', () => {
      const x = '-1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });
  });

  describe('when neither the plus nor minus settings are true', () => {
    const settings = {
      plus: false,
      minus: false,
    };

    it('handles positives', () => {
      const x = '1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles negatives', () => {
      const x = '-1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles positives without a decimal', () => {
      const x = '1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles negatives without a decimal', () => {
      const x = '-1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });
  });

  describe("when the plus setting is true but minus isn't", () => {
    const settings = {
      plus: true,
      minus: false,
    };

    it('handles positives', () => {
      const x = '1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles negatives', () => {
      const x = '-1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles positives without a decimal', () => {
      const x = '1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('+1,234.00');
    });

    it('handles negatives without a decimal', () => {
      const x = '-1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });
  });

  describe("when the minus setting is true but plus isn't", () => {
    const settings = {
      plus: false,
      minus: true,
    };

    it('handles positives', () => {
      const x = '1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles negatives', () => {
      const x = '-1234.00';
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });

    it('handles positives without a decimal', () => {
      const x = '1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('1,234.00');
    });

    it('handles negatives without a decimal', () => {
      const x = '-1234';
      expect(subject.formatAsCurrency(x, settings)).toEqual('–1,234.00');
    });
  });
});
