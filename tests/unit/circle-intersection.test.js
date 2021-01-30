const { findIntersection } = require('../../src/topsecret-msg/algorithms/v1/circle-intersection');

describe('Find circle intersection unit tests', () => {
  it('should return no intersection if circles are too far away from eachother', () => {
    const c1 = { x: 0, y: 0, d: 1 };
    const c2 = { x: -10, y: 10, d: 1 };
    const intersection = findIntersection(c1, c2);
    expect(intersection).toEqual([]);
  });

  it('should return no intersection if one circle is inside the other', () => {
    const c1 = { x: 0, y: 0, d: 10 };
    const c2 = { x: 0, y: 0, d: 1 };
    const intersection = findIntersection(c1, c2);
    expect(intersection).toEqual([]);
  });

  it('should return a single intersection point if circle are tangent', () => {
    const c1 = { x: 0, y: 0, d: 2 };
    const c2 = { x: 3, y: 0, d: 1 };
    const intersection = findIntersection(c1, c2);
    expect(intersection).toEqual([{ x: 2, y: 0 }]);
  });

  it('should return a both intersection points if in regular intersection scenario', () => {
    const c1 = { x: -1, y: 1, d: 2 };
    const c2 = { x: 0, y: 0, d: 1 };
    const intersection = findIntersection(c1, c2);
    expect(intersection).toEqual([
      { x: 0.911, y: 0.411 },
      { x: -0.411, y: -0.911 },
    ]);
  });
});
