const httpStatus = require('http-status');
const logger = require('../config/logger');
const { isEmptyObject } = require('../utils/utils');
const ApiError = require('../utils/ApiError');
const { getLocation, getMessage } = require('./algorithms');
const Repository = require('./repository');

const repository = new Repository();

const getDataFromSatellites = (satellites) => {
  const { distances, partialMessages } = satellites.reduce(
    (acc, curr) => {
      acc.distances.push({ satellite: curr.name, distance: curr.distance });
      acc.partialMessages.push(curr.message);
      return acc;
    },
    { distances: [], partialMessages: [] }
  );

  return { distances, partialMessages };
};

const getMessageAndLocation = async ({ satellites }) => {
  const { distances, partialMessages } = getDataFromSatellites(satellites);
  const locationPromise = getLocation(distances);
  const messagePromise = getMessage(partialMessages);
  try {
    const [finalLocation, finalMessage] = await Promise.all([locationPromise, messagePromise]);
    return {
      position: finalLocation,
      message: finalMessage,
    };
  } catch (error) {
    logger.debug(error);
    throw new ApiError(httpStatus.NOT_FOUND, 'There is not enough information.');
  }
};

const getStoredMessageAndLocation = async () => {
  const storedMessageAndLocation = await repository.getMessageAndLocation();
  if (isEmptyObject(storedMessageAndLocation)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'There is not enough information.');
  }
  return storedMessageAndLocation;
};

const processAndSaveSingleSatelliteData = async (satelliteData) => {
  await repository.saveSingleSatelliteData(satelliteData);
  const data = await repository.getAllSatellitesData();

  const isEnoughSatellitesData = data.length >= 3;
  if (isEnoughSatellitesData) {
    try {
      const { message, position: location } = await getMessageAndLocation({ satellites: data });
      await repository.saveMessageAndLocation(message, location);
    } catch (error) {
      logger.error(error);
    }
  }
  return satelliteData;
};

module.exports = {
  getMessageAndLocation,
  processAndSaveSingleSatelliteData,
  getStoredMessageAndLocation,
};
