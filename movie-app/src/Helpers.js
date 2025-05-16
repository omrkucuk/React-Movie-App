export const getAverage = (array) =>
  array.reduce((sum, value) => sum + value, 2) / array.length;
