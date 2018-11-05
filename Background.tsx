import * as React from 'react';
import { Sprite, SpriteProperties, Container } from 'react-pixi-fiber';
import { height, backgroundTexture } from './index';
export class Background extends React.Component<
  SpriteProperties & {
    app: PIXI.Application;
  },
  {
    x: number;
  }
> {
  state = { x: 0 };
  animate = (delta: number) => {
    this.setState(state => ({
      x: state.x - 0.5 * delta,
    }));
  };
  componentDidMount() {
    this.props.app.ticker.add(this.animate);
  }
  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }
  render() {
    const scale = height / backgroundTexture.baseTexture.height;
    const x =
      ((this.state.x || 0) % backgroundTexture.baseTexture.width) * scale;
    return (
      <Container>
        <Sprite
          texture={backgroundTexture}
          scale={scale}
          {...this.props}
          x={x}
        />
        <Sprite
          texture={backgroundTexture}
          scale={scale}
          {...this.props}
          x={x + backgroundTexture.baseTexture.width * scale}
        />
      </Container>
    );
  }
}
