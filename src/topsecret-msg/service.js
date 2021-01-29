const httpStatus = require('http-status');
const logger = require('../config/logger');
const { isEmptyObject } = require('../utils/utils');
const ApiError = require('../utils/ApiError');
const MemoryRepository = require('./memory-repository');

const memoryRepository = new MemoryRepository();

const getLocation = async (distances) => {
  // get location from intersecting satellite circles
  // if no possible location then throw an ApiError
  return {
    x: -100.0,
    y: 75.7,
  };
};

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
  const [finalLocation, finalMessage] = await Promise.all([locationPromise, messagePromise]);

  return {
    position: finalLocation,
    message: finalMessage,
  };
};

const getStoredMessageAndLocation = async () => {
  const hiddenMessageAndLocation = await memoryRepository.getMessageAndLocation();
  if (isEmptyObject(hiddenMessageAndLocation)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is not enough information.');
  }
  return hiddenMessageAndLocation;
};

const processAndSaveSingleSatelliteData = async (satelliteData) => {
  await memoryRepository.saveSingleSatellitesData(satelliteData);
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
