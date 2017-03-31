export const pipe = (val, ...fns) => fns.reduce((prev, cur) => cur(prev), val);

export const getCategoryName = (categories, id) => {
  return categories.find(cat => cat.id === id).name;
};

export const groupByProperty = (arrayOfObjects, propertyName) => {
  const grouped = arrayOfObjects.reduce(
    (total, item) => {
      const val = item[propertyName];
      const keys = Object.keys(item);
      const itemWithoutProperty = keys
        .filter(key => key !== propertyName)
        .reduce(
          (acc, key) => {
            acc[key] = item[key];
            return acc;
          },
          {}
        );
      total[val] = total[val] || [];
      total[val].push(itemWithoutProperty);
      return total;
    },
    {}
  );
  return grouped;
};
