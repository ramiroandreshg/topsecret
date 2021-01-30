const isNil = (val) => val === undefined || val === null;

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isFiniteNumber = (n) => Number.isFinite(n) && !Number.isNaN(n);

const removeDuplicates = (arr) => arr.filter((item, pos) => arr.findIndex((i) => i.x === item.x && i.y === item.y) === pos);

const roundPrecise = (number) => Math.round(number * 1000) / 1000;

module.exports = {
  isNil,
  isEmptyObject,
  isFiniteNumber,
  removeDuplicates,
  roundPrecise,
};
