import * as dateHelpers from './date-helpers';
import MockDate from 'mockdate';

MockDate.set('2017/03/28', -660);

describe('getTodaysDate', () => {
  it('correctly returns date', () => {
    const today = new Date('2017-03-28');
    expect(dateHelpers.getTodaysDate()).toEqual(today);
  });
});

describe('getTodaysDateISOString', () => {
  it('correctly returns date', () => {
    expect(dateHelpers.getTodaysDateISO()).toEqual('2017-03-28');
  });
});

describe('formatLongDate', () => {
  describe('when the date is 2017-05-01', () => {
    const date = '2017-05-01';
    expect(dateHelpers.formatLongDate(date)).toEqual('Monday, 1 May 2017');
  });
});

describe('getNMonthsAgoISO', () => {
  describe('when n is 1', () => {
    const n = 1;
    it('returns Mar 1st', () => {
      expect(dateHelpers.getNMonthsAgoISO(n)).toEqual('2017-03-01');
    });
  });

  describe('when n is 3', () => {
    const n = 3;
    it('returns Jan 1st', () => {
      expect(dateHelpers.getNMonthsAgoISO(n)).toEqual('2017-01-01');
    });
  });

  describe('when n is 4', () => {
    const n = 4;
    it('returns Dec 1st, 2016', () => {
      expect(dateHelpers.getNMonthsAgoISO(n)).toEqual('2016-12-01');
    });
  });

  describe('when n is 12', () => {
    const n = 12;
    it('returns Apr 1st, 2016', () => {
      expect(dateHelpers.getNMonthsAgoISO(n)).toEqual('2016-04-01');
    });
  });

  describe('when n is 30', () => {
    const n = 30;
    it('returns October 1st, 2014', () => {
      expect(dateHelpers.getNMonthsAgoISO(n)).toEqual('2014-10-01');
    });
  });
});
