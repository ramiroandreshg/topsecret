const config = require('./config/config');

if (config.newRelic.enabled) {
  // eslint-disable-next-line global-require
  require('newrelic');
}

const app = require('./app');
const logger = require('./config/logger');

let server;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

logger.info('Initializing TopSecret Server..');
server = app.listen(config.port, () => {
  logger.info(`Server listening to port ${config.port}`);
});

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
