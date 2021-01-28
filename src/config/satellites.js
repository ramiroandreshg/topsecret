const SAT_NAMES = {
  KENOBI: 'kenobi',
  SKYWALKER: 'skywalker',
  SATO: 'sato',
};

const SAT_DATA = [
  {
    name: SAT_NAMES.KENOBI,
    coords: {
      x: -500,
      y: -200,
    },
  },
  {
    name: SAT_NAMES.SKYWALKER,
    coords: {
      x: 100,
      y: -100,
    },
  },
  {
    name: SAT_NAMES.SATO,
    coords: {
      x: 500,
      y: 100,
    },
  },
];

module.exports = {
  SAT_DATA,
  SAT_NAMES,
};
