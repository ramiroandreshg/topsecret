const httpStatus = require('http-status');
const logger = require('../config/logger');
const { isEmptyObject } = require('../utils/utils');
const ApiError = require('../utils/ApiError');
const { getLocation, getMessage } = require('./algorithms');
const MemoryRepository = require('./memory-repository');

const memoryRepository = new MemoryRepository();

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
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is not enough information.');
  }
};

const getStoredMessageAndLocation = async () => {
  const storedMessageAndLocation = await memoryRepository.getMessageAndLocation();
  if (isEmptyObject(storedMessageAndLocation)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is not enough information.');
  }
  return storedMessageAndLocation;
};

const processAndSaveSingleSatelliteData = async (satelliteData) => {
  await memoryRepository.saveSingleSatelliteData(satelliteData);
  const data = await memoryRepository.getAllSatellitesData();

  const isEnoughSatellitesData = data.length >= 3;
  if (isEnoughSatellitesData) {
    try {
      const { message, position: location } = await getMessageAndLocation({ satellites: data });
      await memoryRepository.saveMessageAndLocation(message, location);
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
