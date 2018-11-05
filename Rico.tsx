import * as React from 'react';
import { Sprite, SpriteProperties } from 'react-pixi-fiber';
import rico from './assets/img/rico.png';
export const ricoTexture = PIXI.Texture.fromImage(rico);
ricoTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
export const Rico = (props: SpriteProperties) => (
  <Sprite texture={ricoTexture} {...props} scale={{ x: -5, y: 5 }} />
);
