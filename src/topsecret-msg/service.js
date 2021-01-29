const httpStatus = require('http-status');
const logger = require('../config/logger');
const { isEmptyObject } = require('../utils/utils');
const ApiError = require('../utils/ApiError');
const MemoryRepository = require('./memory-repository');

const memoryRepository = new MemoryRepository();

// eslint-disable-next-line no-unused-vars
const getLocation = async (distances) => {
  // get location from intersecting satellite circles
  // if no possible location then throw an ApiError
  return {
    x: -100.0,
    y: 75.7,
  };
};

// eslint-disable-next-line no-unused-vars
const getMessage = async (partialMessages) => {
  // build message from what the satellites received (individual partial messages might be broken)
  // consider that we might miss words. If no satellite got a given word then we should throw an ApiError
  return 'este es un mensaje secreto.';
};

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
