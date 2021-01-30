const { isFiniteNumber, removeDuplicates, roundPrecise } = require('../../../../utils/utils');
const Circle = require('./circle');

const formatResult = (coordsArray) => {
  const result = [];
  for (let i = 0; i < coordsArray.length; i += 2) {
    const x = coordsArray[i];
    const y = coordsArray[i + 1];
    if (isFiniteNumber(x) && isFiniteNumber(y)) {
      result.push({ x: roundPrecise(x), y: roundPrecise(y) });
    }
  }
  return removeDuplicates(result);
};

const calculateIntersection = (c1, c2) => {
  let y1;
  let y2;
  let val1;
  let val2;
  // Calculating distance between circles centers
  const D = Math.sqrt((c1.a - c2.a) * (c1.a - c2.a) + (c1.b - c2.b) * (c1.b - c2.b));
  const properDistanceForIntersection = c1.r + c2.r >= D && D >= Math.abs(c1.r - c2.r);
  if (!properDistanceForIntersection) {
    return [];
  }
  // Area according to Heron's formula
  const a1 = D + c1.r + c2.r;
  const a2 = D + c1.r - c2.r;
  const a3 = D - c1.r + c2.r;
  const a4 = -D + c1.r + c2.r;
  const area = Math.sqrt(a1 * a2 * a3 * a4) / 4;

  // Calculating x axis intersection values
  val1 = (c1.a + c2.a) / 2 + ((c2.a - c1.a) * (c1.r * c1.r - c2.r * c2.r)) / (2 * D * D);
  val2 = (2 * (c1.b - c2.b) * area) / (D * D);
  const x1 = val1 + val2;
  const x2 = val1 - val2;

  // Calculating y axis intersection values
  val1 = (c1.b + c2.b) / 2 + ((c2.b - c1.b) * (c1.r * c1.r - c2.r * c2.r)) / (2 * D * D);
  val2 = (2 * (c1.a - c2.a) * area) / (D * D);
  y1 = val1 - val2;
  y2 = val1 + val2;

  // Intersection pointsare (x1, y1) and (x2, y2)
  // Because for every x we have two values of y, and the same thing for y,
  // we have to verify that the intersection points as chose are on the
  // if one point is nocircle otherwise we have to swap between the points
  const test = Math.abs((x1 - c1.a) * (x1 - c1.a) + (y1 - c1.b) * (y1 - c1.b) - c1.r * c1.r);
  if (test > 0.0000001) {
    const tmp = y1;
    y1 = y2;
    y2 = tmp;
  }
  return formatResult([x1, y1, x2, y2]);
};

const findIntersection = (c1, c2) => {
  const circle1 = new Circle(c1.x, c1.y, c1.d);
  const circle2 = new Circle(c2.x, c2.y, c2.d);

  return calculateIntersection(circle1, circle2);
};

module.exports = {
  findIntersection,
};
