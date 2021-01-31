const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Top Secret API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/ramiroandreshg/topsecret/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
    },
  ],
};

module.exports = swaggerDef;
