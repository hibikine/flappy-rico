import * as React from 'react';
import bar from '../assets/img/bar.png';
import { Texture, Point, SCALE_MODES, PI_2 } from 'pixi.js';
import { TilingSprite, SpriteProperties } from 'react-pixi-fiber';
import { resource } from '../ResourceContext';
import { orangeSize } from '../Orange/consts';
import { height } from '../constants';

interface Props extends SpriteProperties {
  barTexture: Texture;
  isUp: boolean;
}

const anchor = new Point(0.5, 1);
const Bar = (props: Props) => {
  const { isUp } = props;
  const s = orangeSize / 4 / props.barTexture.baseTexture.realHeight;
  const scale = new Point(s, s);
  props.barTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
  return (
    <TilingSprite
      anchor={anchor}
      scale={scale}
      width={16}
      height={height}
      texture={props.barTexture}
      rotation={isUp ? 0 : PI_2 / 2}
      {...props}
    />
  );
};
export default resource<'barTexture', Props>('barTexture', bar)(Bar);
