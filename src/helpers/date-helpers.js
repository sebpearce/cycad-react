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

const monthsAbbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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

const toYYYYMMDDString = date => {
  return date.toISOString().slice(0, 10);
};

export const formatLongDate = isoDate => {
  const dateObj = new Date(isoDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const month = monthsAbbr[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

export const getTodaysDate = () => {
  const today = new Date();
  return new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  );
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
  const out = toYYYYMMDDString(
    new Date(
      Date.UTC(
        thatDate.getFullYear(),
        thatDate.getMonth(),
        thatDate.getDate(),
        0,
        0,
        0
      )
    )
  );
  return out;
};
