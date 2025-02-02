const isNil = (val) => val === undefined || val === null;

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isEmptyArray = (arr) => arr.length === 0;

const isFiniteNumber = (n) => Number.isFinite(n) && !Number.isNaN(n);

const removeDuplicatePoints = (arr) =>
  arr.filter((item, pos) => arr.findIndex((i) => i.x === item.x && i.y === item.y) === pos);

const intersectArrayOfPoints = (arr1, arr2) => arr1.filter((a) => arr2.some((b) => a.x === b.x && a.y === b.y));

const roundPrecise = (number) => Math.round(number * 1000) / 1000;

module.exports = {
  isNil,
  isEmptyObject,
  isEmptyArray,
  isFiniteNumber,
  removeDuplicatePoints,
  intersectArrayOfPoints,
  roundPrecise,
};
