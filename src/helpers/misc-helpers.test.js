import * as subject from './misc-helpers';

describe('groupByProperty', () => {
  const propertyName = 'cat_id';
  const input = [
    {
      id: '9f2b21fe-3e2c-4e41-a1ae-f1e375df50b8',
      amt: '-14.00',
      date: '2017-03-27',
      note: '',
      cat_id: '4',
    },
    {
      id: 'ecda57a9-0365-4f2f-b43d-8a2e9a523d39',
      amt: '-14.00',
      date: '2017-03-28',
      note: '',
      cat_id: '4',
    },
    {
      id: '6d690cf5-2534-4c18-b0b0-8c638a208826',
      amt: '-12.30',
      date: '2016-12-21',
      note: '',
      cat_id: '15',
    },
    {
      id: 'e837d0de-f23b-4c89-aa82-8bbe2a2f7b4b',
      amt: '-2.30',
      date: '2017-01-18',
      note: '',
      cat_id: '2',
    },
  ];
  const output = {
    '2': [
      {
        id: 'e837d0de-f23b-4c89-aa82-8bbe2a2f7b4b',
        amt: '-2.30',
        date: '2017-01-18',
        note: '',
      },
    ],
    '4': [
      {
        id: '9f2b21fe-3e2c-4e41-a1ae-f1e375df50b8',
        amt: '-14.00',
        date: '2017-03-27',
        note: '',
      },
      {
        id: 'ecda57a9-0365-4f2f-b43d-8a2e9a523d39',
        amt: '-14.00',
        date: '2017-03-28',
        note: '',
      },
    ],
    '15': [
      {
        id: '6d690cf5-2534-4c18-b0b0-8c638a208826',
        amt: '-12.30',
        date: '2016-12-21',
        note: '',
      },
    ],
  };

  it('works', () => {
    expect(subject.groupByProperty(input, propertyName)).toEqual(output);
  });
});
