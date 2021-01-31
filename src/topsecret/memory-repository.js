const { SAT_NAMES } = require('../config/satellites');
const { isEmptyObject } = require('../utils/utils');
const AbstractRepository = require('../utils/abstract-repository');

const initSatellitesData = () => {
  const satellitesData = {};
  Object.values(SAT_NAMES).forEach((name) => {
    satellitesData[name] = {};
  });
  return satellitesData;
};

module.exports = class MemoryRepository extends AbstractRepository {
  constructor() {
    super();
    this.satellites = initSatellitesData();
    this.secret = {};
  }

  async saveSingleSatelliteData(singleSatelliteData) {
    const { name } = singleSatelliteData;
    this.satellites[name] = singleSatelliteData;
  }

  async getAllSatellitesData() {
    const satellitesData = [];
    Object.values(SAT_NAMES).forEach((name) => {
      if (!isEmptyObject(this.satellites[name])) {
        satellitesData.push(this.satellites[name]);
      }
    });
    return satellitesData;
  }

  async saveMessageAndLocation(message, location) {
    this.secret.message = message;
    this.secret.position = location;
  }

  async getMessageAndLocation() {
    return this.secret;
  }

  async cleanUpData() {
    this.satellites = initSatellitesData();
    this.secret = {};
  }
};
