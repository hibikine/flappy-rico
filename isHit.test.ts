import isHit from './isHit';
import { ricoSize, ricoX } from './Rico/consts';
import { orangeSize } from './Orange/consts';
describe('isHit', () => {
  test('should not hit on not touching', () => {
    expect(isHit(100, { x: ricoX + ricoSize + orangeSize + 0.01, y: 100 })).toBeFalsy();
  });
  test('should hit on touching', () => {
    expect(isHit(100, { x: ricoX + ricoSize + orangeSize, y: 100 })).toBeTruthy();
  });
  test('should hit on include', () => {
    expect(isHit(100, { x: ricoX + orangeSize / 2, y: 110 })).toBeTruthy();
  });
  test('should hit in orange', () => {
    expect(isHit(100, { x: ricoX + ricoSize, y: 100 })).toBeTruthy();
  });
});
