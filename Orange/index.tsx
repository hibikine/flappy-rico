import * as React from 'react';
import { Sprite, SpriteProperties } from 'react-pixi-fiber';
import orange from './assets/img/orange.png';
import * as PIXI from 'pixi.js';
import { resource } from '../ResourceContext';
import { orangeSize } from './consts';
export interface Props extends SpriteProperties {
  orangeTexture: PIXI.Texture;
}
const anchor = new PIXI.ObservablePoint(() => {}, undefined, 0.5, 0.5);
const Orange = (props: Props) => {
  props.orangeTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const scaleValue = orangeSize / props.orangeTexture.baseTexture.width;
  const scale = new PIXI.Point(scaleValue, scaleValue);
  return (
    <Sprite
      scale={scale}
      {...props}
      texture={props.orangeTexture}
      anchor={anchor}
    />
  );
};
export default resource<'orangeTexture', Props>('orangeTexture', orange)(
  Orange
);
