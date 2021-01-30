const SAT_NAMES = {
  KENOBI: 'kenobi',
  SKYWALKER: 'skywalker',
  SATO: 'sato',
};

const SAT_DATA = {
  [SAT_NAMES.KENOBI]: {
    coords: {
      x: -500,
      y: -200,
    },
  },
  [SAT_NAMES.SKYWALKER]: {
    coords: {
      x: 100,
      y: -100,
    },
  },
  [SAT_NAMES.SATO]: {
    coords: {
      x: 500,
      y: 100,
    },
  },
};

module.exports = {
  SAT_DATA,
  SAT_NAMES,
};
