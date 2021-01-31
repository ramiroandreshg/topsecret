const os = require('os');
const winston = require('winston');
const config = require('./config');
require('winston-loggly-bulk');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

let logglyTransport;
if (config.loggly.enabled) {
  logglyTransport = new winston.transports.Loggly({
    subdomain: config.loggly.subdomain,
    inputToken: config.loggly.customToken,
    json: true,
    tags: ['fuegodequasar', os.hostname(), process.env.NODE_ENV],
    format: winston.format.combine(
      enumerateErrorFormat(),
      winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
  });
}

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: config.loggly.enabled
    ? [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
        logglyTransport,
      ]
    : [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
});

module.exports = logger;
