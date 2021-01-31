const express = require('express');
const validate = require('../middlewares/validate');
const { multipleSatelliteData, singleSatelliteData } = require('./validations');
const {
  processDataFromMultipleSatellites,
  processDataFromSingleSatellite,
  getSecretFromSplitSatellitesData,
} = require('./controller');

const router = express.Router();

router.route('/topsecret').post(validate(multipleSatelliteData), processDataFromMultipleSatellites);
router.route('/topsecret_split/:satelliteName').post(validate(singleSatelliteData), processDataFromSingleSatellite);
router.route('/topsecret_split').get(getSecretFromSplitSatellitesData);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: topsecret
 *   description: top secret satellite operations
 */

/**
 * @swagger
 * path:
 *  /topsecret:
 *    post:
 *      summary: Process data from multiple satellites and returns the secret message and location
 *      description: This operation receives data from 3 (or more) satellites in order to decode a secret message an triangulate the location of the source
 *      tags: [topsecret]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - satellites
 *              properties:
 *                satellites:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/SatelliteData'
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/MessageAndLocation'
 *        "400":
 *          $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * path:
 *  /topsecret_split:
 *    get:
 *      summary: Get processed data from multiple calls to single satellite data endpoints
 *      description: This operation gets the processed data received from every satellite and returns the secret message and location of the source
 *      tags: [topsecret]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/MessageAndLocation'
 *        "400":
 *          $ref: '#/components/responses/BadRequest'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /topsecret_split/{satelliteName}:
 *    post:
 *      summary: Process data from a single satellite
 *      description: This operation receives data from one satellite in order to decode a secret message an triangulate the location of the source
 *      tags: [topsecret]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: satelliteName
 *          required: true
 *          schema:
 *            type: string
 *          description: kenobi | sato | skywalker
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - distance
 *                - message
 *              properties:
 *                distance:
 *                  type: number
 *                message:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/SatelliteData'
 *        "400":
 *          $ref: '#/components/responses/BadRequest'
 */
