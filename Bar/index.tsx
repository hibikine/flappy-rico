import * as React from 'react';
import bar from '../assets/img/bar.png';
import { Texture, Point, SCALE_MODES, BaseRenderTexture } from 'pixi.js';
import { Sprite, SpriteProperties } from 'react-pixi-fiber';
import { resource } from '../ResourceContext';
import { orangeSize } from '../Orange/consts';

interface Props extends SpriteProperties {
  barTexture: Texture;
}

const anchor = new Point(0.5, 1);
const Bar = (props: Props) => {
  const s = orangeSize / props.barTexture.baseTexture.realHeight;
  const scale = new Point(s, s);
  props.barTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
  return (
    <Sprite
      anchor={anchor}
      scale={scale}
      texture={props.barTexture}
      {...props}
    />
  );
};
export default resource<'barTexture', Props>('barTexture', bar)(Bar);
