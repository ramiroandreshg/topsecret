const { satellites } = require('../../../config/config');
const { findIntersection } = require('./circle-intersection');
const { isEmptyArray, intersectArrayOfPoints } = require('../../../utils/utils');

const getLocation = async (distances) => {
  return new Promise((resolve, reject) => {
    // at least we need data from 2 satellites to try finding the location
    const distA = distances[0];
    const distB = distances[1];

    const circle1 = {
      x: satellites[distA.satellite].coords.x,
      y: satellites[distA.satellite].coords.y,
      d: distA.distance,
    };
    const circle2 = {
      x: satellites[distB.satellite].coords.x,
      y: satellites[distB.satellite].coords.y,
      d: distB.distance,
    };

    let baseIntersections = findIntersection(circle1, circle2);
    if (isEmptyArray(baseIntersections)) {
      reject(new Error('No intersection between satellite location data.'));
    }

    let idx = 2; // now we compare other satellite data (leaving it open to have more satellites in the future)
    while (idx < distances.length) {
      const distC = distances[idx];
      const circle3 = {
        x: satellites[distC.satellite].coords.x,
        y: satellites[distC.satellite].coords.y,
        d: distC.distance,
      };
      const tempIntersections = findIntersection(circle1, circle3); // we could use either c1 or c2 here
      if (isEmptyArray(tempIntersections)) {
        // means that the 3rd satellite doesn't match the data from c1 and c2
        reject(new Error('No intersection between satellite location data.'));
      }
      baseIntersections = intersectArrayOfPoints(baseIntersections, tempIntersections);
      if (isEmptyArray(baseIntersections)) {
        reject(new Error('No intersection between new satellite and previous satellite location data.'));
      }

      idx += 1;
    }

    if (baseIntersections.length !== 1) {
      reject(new Error('No intersection between all satellite data.'));
    }

    // we went through all satellites data and we ended up with a single intersection point
    resolve(baseIntersections[0]);
  });
};

module.exports = {
  getLocation,
};
