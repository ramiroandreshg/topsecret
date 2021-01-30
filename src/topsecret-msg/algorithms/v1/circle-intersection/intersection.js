const Circle = require('./circle');

const calculateCirclesIntersection = (c1, c2) => {
  let val1;
  let val2;
  let y1;
  let y2;
  // D = distance between circles centers
  const D = Math.sqrt((c1.a - c2.a) * (c1.a - c2.a) + (c1.b - c2.b) * (c1.b - c2.b));
  const notPossibleToIntersect = c1.r + c2.r < D || D > Math.abs(c1.r - c2.r);
  if (notPossibleToIntersect) {
    return [];
  }
  // Two circles intersects or tangent
  // Area according to Heron's formula
  //----------------------------------
  const a1 = D + c1.r + c2.r;
  const a2 = D + c1.r - c2.r;
  const a3 = D - c1.r + c2.r;
  const a4 = -D + c1.r + c2.r;
  const area = Math.sqrt(a1 * a2 * a3 * a4) / 4;
  // Calculating x axis intersection values
  //---------------------------------------
  val1 = (c1.a + c2.a) / 2 + ((c2.a - c1.a) * (c1.r * c1.r - c2.r * c2.r)) / (2 * D * D);
  val2 = (2 * (c1.b - c2.b) * area) / (D * D);
  const x1 = val1 + val2;
  const x2 = val1 - val2;
  // Calculating y axis intersection values
  //---------------------------------------
  val1 = (c1.b + c2.b) / 2 + ((c2.b - c1.b) * (c1.r * c1.r - c2.r * c2.r)) / (2 * D * D);
  val2 = (2 * (c1.a - c2.a) * area) / (D * D);
  y1 = val1 - val2;
  y2 = val1 + val2;
  // Intersection pointsare (x1, y1) and (x2, y2)
  // Because for every x we have two values of y, and the same thing for y,
  // we have to verify that the intersection points as chose are on the
  // circle otherwise we have to swap between the points
  const test = Math.abs((x1 - c1.a) * (x1 - c1.a) + (y1 - c1.b) * (y1 - c1.b) - c1.r * c1.r);
  if (test > 0.0000001) {
    // point is not on the circle, swap between y1 and y2
    // the value of 0.0000001 is arbitrary chose, smaller values are also OK
    // do not use the value 0 because of computer rounding problems
    const tmp = y1;
    y1 = y2;
    y2 = tmp;
  }
  return [x1, y1, x2, y2];
};

const findIntersection = (c1, c2) => {
  const circle1 = new Circle(...c1);
  const circle2 = new Circle(...c2);
  const intersection = calculateCirclesIntersection(circle1, circle2);
  return intersection;
};

module.exports = {
  findIntersection,
};
