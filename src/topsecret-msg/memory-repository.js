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
  }

  async saveSingleSatellitesData(singleSatelliteData) {
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

  async cleanUpSatellitesData() {
    this.satellites = initSatellitesData();
  }
};
