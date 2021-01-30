/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
module.exports = class AbstractRepository {
  async saveSingleSatelliteData(singleSatelliteData) {
    throw new Error('Not implemented');
  }

  async getAllSatellitesData() {
    throw new Error('Not implemented');
  }

  async saveMessageAndLocation(message, location) {
    throw new Error('Not implemented');
  }

  async getMessageAndLocation() {
    throw new Error('Not implemented');
  }

  async cleanUpData() {
    throw new Error('Not implemented');
  }
};
