const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const topsecretService = require('./service');

const processDataFromMultipleSatellites = catchAsync(async (req, res) => {
  const topsecretMessage = await topsecretService.getMessageAndLocation(req.body);
  res.status(httpStatus.OK).send(topsecretMessage);
});

const processDataFromSingleSatellite = catchAsync(async (req, res) => {
  const { satelliteName } = req.params;
  const satelliteData = await topsecretService.processAndSaveSingleSatelliteData({ ...req.body, name: satelliteName });
  res.status(httpStatus.CREATED).send(satelliteData);
});

const getSecretFromSplitSatellitesData = catchAsync(async (req, res) => {
  const topsecretMessage = await topsecretService.getStoredMessageAndLocation();
  res.status(httpStatus.OK).send(topsecretMessage);
});

module.exports = {
  processDataFromMultipleSatellites,
  processDataFromSingleSatellite,
  getSecretFromSplitSatellitesData,
};
