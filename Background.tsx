import * as React from 'react';
import { Sprite, SpriteProperties, Container } from 'react-pixi-fiber';
import { height } from './constants';
import background from './assets/img/background-1.png';
import { ResourceConsumer, resource } from './ResourceContext';
export interface Props extends SpriteProperties {
  app: PIXI.Application;
  x: number;
  speed?: number;
  stop?: boolean;
  backgroundTexture: PIXI.Texture;
}
class Background extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const { backgroundTexture } = props;
    backgroundTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  }

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
    const { backgroundTexture } = this.props;
    const scale = height / backgroundTexture.baseTexture.realHeight;
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

export default resource<'backgroundTexture', Props>(
  'backgroundTexture',
  background
)(Background);
