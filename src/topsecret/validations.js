const Joi = require('@hapi/joi');
const { SAT_NAMES } = require('../config/satellites');

const validSatteliteNames = Object.values(SAT_NAMES);

const multipleSatelliteData = {
  body: Joi.object().keys({
    satellites: Joi.array()
      .required()
      .items(
        Joi.object().keys({
          name: Joi.string()
            .required()
            .valid(...validSatteliteNames),
          distance: Joi.number().required(),
          message: Joi.array().items(Joi.string().allow('')).required().min(1),
        })
      )
      .min(1),
  }),
};

const singleSatelliteData = {
  params: Joi.object().keys({
    satelliteName: Joi.string()
      .required()
      .valid(...validSatteliteNames),
  }),
  body: Joi.object().keys({
    distance: Joi.number().required(),
    message: Joi.array().items(Joi.string().allow('')).required().min(1),
  }),
};

module.exports = {
  multipleSatelliteData,
  singleSatelliteData,
};
