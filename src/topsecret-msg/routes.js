const express = require('express');
const validate = require('../middlewares/validate');
const { multipleSatelliteData, singleSatelliteData } = require('./validations');
const {
  processDataFromMultipleSatellites,
  processDataFromSingleSatellite,
  getMessageFromSplitSatellitesData,
} = require('./controller');

const router = express.Router();

router.route('/topsecret').post(validate(multipleSatelliteData), processDataFromMultipleSatellites);
router.route('/topsecret_split/:satelliteName').post(validate(singleSatelliteData), processDataFromSingleSatellite);
router.route('/topsecret_split').get(getMessageFromSplitSatellitesData);

module.exports = router;
