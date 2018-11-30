import { ricoX, ricoSize } from './Rico/consts';
import { orangeSize } from './Orange/consts';
import { barSize } from './Bar/consts';

export default (ricoY: number, { x, y }: { x: number; y: number }) =>
  (x - ricoX) ** 2 + (y - ricoY + ricoSize / 2) ** 2 <=
  ((ricoSize + orangeSize) / 2) ** 2;

export const isBarHit = (
  rico: { x: number; y: number },
  orange: { x: number; y: number; isUp: boolean }
) => {
  if (orange.x - ricoSize - barSize < rico.x) {
    if (orange.x + barSize + ricoSize > rico.x) {
      return orange.isUp ? orange.y > rico.y : orange.y < rico.y;
    }
  }
  return false;
};
