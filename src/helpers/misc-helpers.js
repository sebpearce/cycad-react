export const pipe = (val, ...fns) => fns.reduce((prev, cur) => cur(prev), val);
