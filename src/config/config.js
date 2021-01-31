const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');
const { SAT_DATA } = require('./satellites');

dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000),
    LOGGLY_ENABLED: Joi.bool().description('Toggle Loggly'),
    LOGGLY_TOKEN: Joi.string().description('Loggly custom token'),
    NEWRELIC_ENABLED: Joi.bool().description('Toggle New Relic'),
    NEWRELIC_LICENSE: Joi.string().description('New Relic licence key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  satellites: SAT_DATA,
  loggly: {
    enabled: !!envVars.LOGGLY_ENABLED || false,
    subdomain: 'fuegodequasar',
    customToken: envVars.LOGGLY_TOKEN,
  },
  newRelic: {
    enabled: !!envVars.NEWRELIC_ENABLED || false,
    licenseKey: envVars.NEWRELIC_LICENSE,
  },
  algorithms: {
    getLocationPath: 'v1',
    getMessagePath: 'v1',
  },
  repository: {
    type: 'memory',
  },
};
