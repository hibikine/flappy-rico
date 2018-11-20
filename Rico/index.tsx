import * as React from 'react';
import { Sprite, SpriteProperties } from 'react-pixi-fiber';
import rico from '../assets/img/rico.png';
import { Texture, Point } from 'pixi.js';
import { resource } from '../ResourceContext';
import { ricoSize, ricoX } from './consts';

export interface Props extends SpriteProperties {
  ricoTexture: Texture;
}
const center = new Point(1, 1);
export const Rico = (props: Props) => {
  props.ricoTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const realScale = ricoSize / props.ricoTexture.baseTexture.height;
  return (
    <Sprite
      anchor={center}
      x={ricoX}
      texture={props.ricoTexture}
      {...props}
      scale={new Point(-realScale, realScale)}
    />
  );
};
export default resource<'ricoTexture', Props>('ricoTexture', rico)(Rico);
