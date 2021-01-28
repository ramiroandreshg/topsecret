const httpStatus = require('http-status');
const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');
const topsecretService = require('./service');

const processDataFromMultipleSatellites = catchAsync(async (req, res) => {
  try {
    const topsecretMessage = await topsecretService.getMessageAndLocation(req.body);
    res.status(httpStatus.OK).send(topsecretMessage);
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.NOT_FOUND).send();
  }
});

const processDataFromSingleSatellite = catchAsync(async (req, res) => {
  const { satelliteName } = req.params;
  const satelliteData = await topsecretService.processAndSaveSingleSatelliteData({ ...req.body, name: satelliteName });
  res.status(httpStatus.CREATED).send(satelliteData);
});

const getMessageFromSplitSatellitesData = catchAsync(async (req, res) => {
  try {
    const topsecretMessage = await topsecretService.getStoredMessageAndLocation();
    res.status(httpStatus.OK).send(topsecretMessage);
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.NOT_FOUND).send();
  }
});

module.exports = {
  processDataFromMultipleSatellites,
  processDataFromSingleSatellite,
  getMessageFromSplitSatellitesData,
};
