const { satellites } = require('../../../config/config');
const { findIntersection } = require('./circle-intersection');
const { isEmptyArray, intersectArrayOfPoints } = require('../../../utils/utils');

/*
 preconditions for v1:
  at least 3 (or more) satellites distance info
*/
const getLocation = async (distances) => {
  return new Promise((resolve, reject) => {
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

    let idx = 2;
    while (idx < distances.length) {
      const distC = distances[idx];
      const circle3 = {
        x: satellites[distC.satellite].coords.x,
        y: satellites[distC.satellite].coords.y,
        d: distC.distance,
      };
      const tempIntersections = findIntersection(circle1, circle3);
      if (isEmptyArray(tempIntersections)) {
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

    resolve(baseIntersections[0]);
  });
};

module.exports = {
  getLocation,
};
