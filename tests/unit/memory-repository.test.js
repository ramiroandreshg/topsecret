const MemoryRepository = require('../../src/topsecret-msg/memory-repository');

const memoryRepository = new MemoryRepository();

describe('Memory Repository suite case', () => {
  beforeEach(async () => {
    await memoryRepository.cleanUpData();
  });

  it('should start with a clean repository if no satellite data has been provided', async () => {
    const persistedData = await memoryRepository.getAllSatellitesData();
    expect(persistedData).toEqual([]);
  });

  it('should persist single satellite data and be able to retrieve it', async () => {
    const satelliteData = { name: 'kenobi', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(satelliteData);

    const persistedData = await memoryRepository.getAllSatellitesData();
    expect(persistedData).toEqual([satelliteData]);
  });

  it('should persist single satellite data for every satellite', async () => {
    const kenobiData = { name: 'kenobi', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(kenobiData);

    const skywalkerData = { name: 'skywalker', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(skywalkerData);

    const satoData = { name: 'sato', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(satoData);

    const persistedData = await memoryRepository.getAllSatellitesData();
    expect(persistedData).toEqual([kenobiData, skywalkerData, satoData]);
  });

  it('should override single satellite data if new data arrives', async () => {
    const satelliteData = { name: 'kenobi', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(satelliteData);

    let persistedData = await memoryRepository.getAllSatellitesData();
    expect(persistedData).toEqual([satelliteData]);

    satelliteData.distance = 200;
    await memoryRepository.saveSingleSatelliteData(satelliteData);

    persistedData = await memoryRepository.getAllSatellitesData();
    const { distance } = persistedData[0];
    expect(distance).not.toBe(10.2);
    expect(distance).toBe(200);
  });

  it('should remove all existent data when performing a clean up', async () => {
    const satelliteData = { name: 'kenobi', distance: 10.2, message: ['simple', 'message'] };
    await memoryRepository.saveSingleSatelliteData(satelliteData);

    let persistedData = await memoryRepository.getAllSatellitesData();
    expect(persistedData.length).toBe(1);

    await memoryRepository.cleanUpData();
    persistedData = await memoryRepository.getAllSatellitesData();

    expect(persistedData.length).toBe(0);
    expect(persistedData).toEqual([]);
  });
});
