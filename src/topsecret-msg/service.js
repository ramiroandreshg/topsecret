// consider caching results

const getLocation = async (distances) => {
  // get location from intersectin satellite circles
  // if no possible location then throw
};

const getMessage = async (partialMessages) => {
  // build message from what the satellites received (individual partial messages might be broken)
  // consider that we might miss words. If no satellite got a given word then we should throw
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

module.exports = {
  getMessageAndLocation,
};
