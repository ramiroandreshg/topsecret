const {
  algorithms: { getLocationPath, getMessagePath },
} = require(`../../config/config`);

const { getMessage } = require(`./${getMessagePath}/get-message`);
const { getLocation } = require(`./${getLocationPath}/get-location`);

module.exports = {
  getMessage,
  getLocation,
};
