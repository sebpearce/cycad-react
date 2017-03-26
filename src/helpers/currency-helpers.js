export const formatWithCommas = x => {
  return x.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};
