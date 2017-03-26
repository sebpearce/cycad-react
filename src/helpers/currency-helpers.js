export const formatWithCommas = x => {
  return x.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

export const addPlusSignIfPositive = x => {
  const stripped = x.replace(/[^–[0-9].]/g, '');
  return Number(stripped) > 0 ? '+'.concat(x) : x;
};
