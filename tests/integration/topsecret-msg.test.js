const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');

describe('topsecret multi sattelite route', () => {
  describe('POST /topsecret', () => {
    const topsecretEndpoint = '/topsecret';
    let multiSatelliteData;
    beforeEach(() => {
      multiSatelliteData = {
        satellites: [
          {
            name: 'kenobi',
            distance: 538.516481,
            message: ['este', '', '', 'mensaje', ''],
          },
          {
            name: 'skywalker',
            distance: 141.421356,
            message: ['', 'es', '', '', 'secreto'],
          },
          {
            name: 'sato',
            distance: 509.901951,
            message: ['este', '', 'un', '', ''],
          },
        ],
      };
    });

    it('should return 200 and successfully process the hidden message and coordinates given valid data', async () => {
      const res = await request(app).post(topsecretEndpoint).send(multiSatelliteData).expect(httpStatus.OK);
      expect(res.body).toEqual({
        position: {
          x: 0,
          y: 0,
        },
        message: 'este es un mensaje secreto',
      });
    });

    it('should return 400 error if no satellites data is provided', async () => {
      delete multiSatelliteData.satellites;
      await request(app).post(topsecretEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if satellites data is provided but it has missing properties', async () => {
      delete multiSatelliteData.satellites[1].message;
      delete multiSatelliteData.satellites[0].distance;
      delete multiSatelliteData.satellites[2].name;
      await request(app).post(topsecretEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if invalid satellite names are provided', async () => {
      multiSatelliteData.satellites[0].name = 'unknown-satellite';
      await request(app).post(topsecretEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });
  });
});

describe('topsecret single/split sattelite routes', () => {
  describe('POST /topsecret_split/:satelliteName', () => {});

  describe('GET /topsecret_split', () => {});
});
