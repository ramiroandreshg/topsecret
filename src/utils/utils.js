const isNil = (val) => val === undefined || val === null;
const isEmptyObject = (obj) => Object.keys(obj).length === 0;

module.exports = {
  isNil,
  isEmptyObject,
};
