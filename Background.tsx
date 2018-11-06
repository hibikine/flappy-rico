import * as React from 'react';
import { Sprite, SpriteProperties, Container } from 'react-pixi-fiber';
import { height } from './constants';
import background from './assets/img/background-1.png';
export const backgroundTexture = PIXI.Texture.fromImage(background);
backgroundTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
export interface Props extends SpriteProperties {
  app: PIXI.Application;
  x: number;
  speed?: number;
  stop?: boolean;
}
export class Background extends React.Component<Props> {
  static defaultProps = { stop: false, speed: 1 };
  state = { x: 0 };
  animate = (delta: number) => {
    const { stop, speed } = this.props;
    const { x } = this.state;
    if (stop) {
      return;
    }
    if (speed != null) {
      this.setState({
        x: x - speed * delta,
      });
    }
  };
  componentDidMount() {
    this.props.app.ticker.add(this.animate);
  }
  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }
  render() {
    const scale = height / backgroundTexture.baseTexture.height;
    const pointScale = new PIXI.Point(scale, scale);
    const x =
      ((this.state.x || 0) % backgroundTexture.baseTexture.width) * scale;
    return (
      <Container>
        <Sprite
          texture={backgroundTexture}
          scale={pointScale}
          {...this.props}
          x={x}
        />
        <Sprite
          texture={backgroundTexture}
          scale={pointScale}
          {...this.props}
          x={x + backgroundTexture.baseTexture.width * scale}
        />
      </Container>
    );
  }
}
