const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const timeZoneOffsetInMs = () => {
  return new Date().getTimezoneOffset() * 6e4;
};

const toYYYYMMDDString = date => {
  return date.toISOString().slice(0, 10);
};

export const formatLongDate = isoDate => {
  const dateObj = new Date(isoDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

export const getTodaysDate = () => {
  const today = new Date();
  return new Date(today - timeZoneOffsetInMs());
};

export const getTodaysDateISO = () => {
  return toYYYYMMDDString(getTodaysDate());
};

export const getNMonthsAgoISO = n => {
  const today = getTodaysDate();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const diff = thisMonth - (n - 1);
  const thatMonth = diff < 0 ? diff + 12 : diff;
  const thatYear = diff < 0 ? thisYear - 1 : thisYear;
  const thatDate = new Date(thatYear, thatMonth);
  const out = toYYYYMMDDString(new Date(thatDate - timeZoneOffsetInMs()));
  return out;
};
