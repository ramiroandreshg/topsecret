const { findIntersection } = require('../../src/topsecret-msg/algorithms/v1/circle-intersection');

describe('Find circle intersection unit tests', () => {
  it('should return an empty result if there is no possible intersection', () => {
    const c1 = [0, 0, 1];
    const c2 = [10, 10, 1];
    const intersection = findIntersection(c1, c2);
    expect(intersection).toEqual([]);
  });
});
