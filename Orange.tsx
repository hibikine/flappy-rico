import * as React from 'react';
import { Sprite, SpriteProperties } from 'react-pixi-fiber';
import orange from './assets/img/orange.png';
import * as PIXI from 'pixi.js';
import { resource } from './ResourceContext';
import { height } from './constants';

export interface Props extends SpriteProperties {
  orangeTexture: PIXI.Texture;
}
const Orange = (props: Props) => {
  props.orangeTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const scaleValue = height / props.orangeTexture.baseTexture.height / 4;
  const scale = new PIXI.Point(scaleValue, scaleValue);
  return <Sprite scale={scale} {...props} texture={props.orangeTexture} />;
};
export default resource<'orangeTexture', Props>('orangeTexture', orange)(
  Orange
);
