// consider caching results

const getLocation = async (distances) => {
  // get location from intersectin satellite circles
  // if no possible location then throw an ApiError
};

const getMessage = async (partialMessages) => {
  // build message from what the satellites received (individual partial messages might be broken)
  // consider that we might miss words. If no satellite got a given word then we should throw an ApiError
};

const getDataFromSatellites = (satellites) => {
  const { distances, partialMessages } = satellites.reduce(
    (acc, curr) => {
      acc.distances.push({ satellite: curr.name, distance: curr.distance });
      acc.messages.push(curr.message);
      return acc;
    },
    { distances: [], messages: [] }
  );

  return { distances, partialMessages };
};

const getMessageAndLocation = async ({ satellites }) => {
  const { distances, partialMessages } = getDataFromSatellites(satellites);
  const locationPromise = getLocation(distances);
  const messagePromise = getMessage(partialMessages);
  const [finalLocation, finalMessage] = await Promise.all([locationPromise, messagePromise]);

  return {
    position: {
      // should use "finalLocation" variable
      x: -100.0,
      y: 75.7,
    },
    message: 'este es un mensaje secreto.', // should use "final message" variable
  };
};

// same as getMessageAndLocation but using a precalculated value from split satellites data
const getStoredMessageAndLocation = async () => {
  // should return something whit this same format
  return {
    position: {
      // should use "finalLocation" variable
      x: -100.0,
      y: 75.7,
    },
    message: 'este es un mensaje secreto.', // should use "final message" variable
  };
  // otherwise (in case it wasn't possible to calculate location and message) it should throw an ApiError
};

// it should save satellite data and if we've got already the other 2 satellite data it should precalculate message and location
const processAndSaveSingleSatelliteData = async (satelliteData) => {
  console.log('data', satelliteData);
  return satelliteData;
};

module.exports = {
  getMessageAndLocation,
  processAndSaveSingleSatelliteData,
  getStoredMessageAndLocation,
};
