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

export const formatLongDate = isoDate => {
  const dateObj = new Date(isoDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  return `${dayOfWeek}, ${day} ${month} ${year}`;
};
