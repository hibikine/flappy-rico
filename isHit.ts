import { ricoX, ricoSize } from './Rico/consts';
import { orangeSize } from './Orange/consts';

export default (ricoY: number, { x, y }: { x: number; y: number }) =>
  (x - ricoX) ** 2 + (y - ricoY) ** 2 <= ((ricoSize + orangeSize) / 2) ** 2;
