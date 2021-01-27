const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');
const satellites = require('./satellites');

dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    LOGGLY_ENABLED: Joi.string().description('Toggle Loggly'),
    LOGGLY_TOKEN: Joi.string().description('Loggly custom token'),
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
  satellites,
  loggly: {
    enabled: !!envVars.LOGGLY_ENABLED || false,
    subdomain: 'topsecret',
    customToken: envVars.LOGGLY_TOKEN,
  },
  newRelic: {
    licenseKey: envVars.NEWRELIC_LICENSE,
  },
};
