const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');

describe('topsecret multi sattelite route', () => {
  const multiSatelliteEndpoint = '/topsecret';
  describe('POST /topsecret', () => {
    let multiSatelliteData;
    beforeEach(() => {
      multiSatelliteData = {
        satellites: [
          {
            name: 'kenobi',
            distance: 538.516481,
            message: ['this', '', '', 'secret', ''],
          },
          {
            name: 'skywalker',
            distance: 141.421356,
            message: ['', 'is', '', '', 'message'],
          },
          {
            name: 'sato',
            distance: 509.901951,
            message: ['this', '', 'a', '', ''],
          },
        ],
      };
    });

    it('should return 200 and successfully process the hidden message and coordinates given valid data', async () => {
      const res = await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.OK);
      expect(res.body).toEqual({
        position: {
          x: 0,
          y: 0,
        },
        message: 'this is a secret message',
      });
    });

    it('should return 400 error if no satellites data is provided', async () => {
      delete multiSatelliteData.satellites;
      await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if satellites data is provided but it has missing properties', async () => {
      delete multiSatelliteData.satellites[1].message;
      delete multiSatelliteData.satellites[0].distance;
      delete multiSatelliteData.satellites[2].name;
      await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if invalid satellite names are provided', async () => {
      multiSatelliteData.satellites[0].name = 'unknown-satellite';
      await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 404 error if it is not possible to crack the secret message', async () => {
      multiSatelliteData.satellites[0].message = ['', '', 'totally-different-message', '', ''];
      await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.NOT_FOUND);
    });

    it('should return 404 error if it is not possible to crack the secret location', async () => {
      multiSatelliteData.satellites[1].distance = 10; // just any number that breaks the 3 circle intersection
      await request(app).post(multiSatelliteEndpoint).send(multiSatelliteData).expect(httpStatus.NOT_FOUND);
    });
  });
});

describe('topsecret single/split sattelite routes', () => {
  const singleSatelliteEndpoint = '/topsecret_split';
  let singleSatelliteData;
  beforeEach(() => {
    singleSatelliteData = {
      kenobi: {
        distance: 538.516481,
        message: ['this', '', '', 'secret', ''],
      },
      skywalker: {
        distance: 141.421356,
        message: ['', 'is', '', '', 'message'],
      },
      sato: {
        distance: 509.901951,
        message: ['this', '', 'a', '', ''],
      },
    };
  });
  describe('POST /topsecret_split/:satelliteName', () => {
    it('should return 200 and successfully persist single satellite data', async () => {
      const { sato: satoData } = singleSatelliteData;
      const res = await request(app).post(`${singleSatelliteEndpoint}/sato`).send(satoData).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        name: 'sato',
        distance: satoData.distance,
        message: satoData.message,
      });
    });

    it('should return 400 if data from an unknown satellite arrives', async () => {
      const { sato: satoData } = singleSatelliteData;
      await request(app).post(`${singleSatelliteEndpoint}/unknown`).send(satoData).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /topsecret_split', () => {
    it('should return 404 if there is not enough information to carck the secret message and location', async () => {
      await request(app).get(singleSatelliteEndpoint).send().expect(httpStatus.NOT_FOUND);
    });

    it('should return 200 and secret message and location if all data is available and secret is solvable', async () => {
      const { sato: satoData, kenobi: kenobiData, skywalker: skywalkerData } = singleSatelliteData;
      await request(app).post(`${singleSatelliteEndpoint}/sato`).send(satoData).expect(httpStatus.CREATED);
      await request(app).post(`${singleSatelliteEndpoint}/kenobi`).send(kenobiData).expect(httpStatus.CREATED);
      await request(app).post(`${singleSatelliteEndpoint}/skywalker`).send(skywalkerData).expect(httpStatus.CREATED);

      const res = await request(app).get(singleSatelliteEndpoint).send().expect(httpStatus.OK);
      expect(res.body).toEqual({
        position: {
          x: 0,
          y: 0,
        },
        message: 'this is a secret message',
      });
    });
  });
});
