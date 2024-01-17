export const calculateAverage = (array: number[]) => {
  if (array.length === 0) {
    return 0;
  }

  const average =
    array.reduce((total, amount) => total + amount, 0) / array.length;

  return average;
};
