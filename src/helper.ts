const getMaxIndex = (array: number[]) => array.reduce((r, v, i, a) => v <= a[r] ? r : i, -1);
const getMinIndex = (array: number[]) => array.reduce((r, v, i, a) => v >= a[r] ? r : i, -1);

export { getMaxIndex, getMinIndex };
