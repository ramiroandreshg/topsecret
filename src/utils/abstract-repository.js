/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
module.exports = class AbstractRepository {
  async saveSingleSatellitesData(singleSatelliteData) {
    throw new Error('Not implemented');
  }

  async getAllSatellitesData() {
    throw new Error('Not implemented');
  }

  async cleanUpSatellitesData() {
    throw new Error('Not implemented');
  }
};
