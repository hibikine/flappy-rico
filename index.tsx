import './index.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { Stage, Graphics, AppContext, Container } from 'react-pixi-fiber';
import background from './assets/img/background-1.png';
import * as PIXI from 'pixi.js';
import { Background } from './Background';
import { Rico } from './Rico';
import { appendFile } from 'fs';
export const backgroundTexture = PIXI.Texture.fromImage(background);
backgroundTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
const width = 720;
export const height = 1080;
interface Props {
  app: PIXI.Application;
}
enum GameState {
  Title,
  Game,
  GameOver,
}
class App extends React.Component<Props> {
  state = { vy: 0, y: 200, pressTime: -1, gameState: GameState.Title };
  gameInit() {
    this.setState({ vy: 0, y: 200, pressTime: -1, gameState: GameState.Game });
  }
  handleClick = () => {
    const { gameState } = this.state;
    if (gameState === GameState.Title) {
      this.gameInit();
    } else if (gameState === GameState.Game) {
      const { vy } = this.state;
      this.setState({ pressTime: 0, vy: -11 });
    } else if (gameState === GameState.GameOver) {
      this.gameInit();
    }
  };
  handlePointerUp = () => {
    this.setState({ pressTime: -1 });
  };
  handleTick = () => {
    const { gameState } = this.state;
    if (gameState === GameState.Game) {
      const { y, vy, pressTime } = this.state;
      const pressSpeed = pressTime === -1 ? 0 : Math.max(0, 5 - pressTime) * 1;

      const nextY = y + vy;
      const gameOver = y > height;
      this.setState({
        y: y + vy,
        vy: vy + 0.6 - pressSpeed,
        pressTime: pressTime === -1 ? -1 : pressTime + 1,
        gameState: gameOver ? GameState.GameOver : gameState,
      });
    }
  };
  componentDidMount() {
    this.props.app.ticker.add(this.handleTick);
  }
  componentWillUnmount() {
    this.props.app.ticker.remove(this.handleTick);
  }
  render() {
    const { app } = this.props;
    const { y, vy } = this.state;
    return (
      <Container>
        <Background
          x={0}
          y={0}
          app={app}
          interactive
          buttonMode
          pointerdown={this.handleClick}
          pointerup={this.handlePointerUp}
        />
        <Rico x={200} y={y} rotation={Math.atan2(vy, 20)} />
      </Container>
    );
  }
}
render(
  <Stage width={720} height={1080} options={{ backgroundColor: 0xaaaaff }}>
    <AppContext.Consumer>{app => <App app={app} />}</AppContext.Consumer>
  </Stage>,
  document.getElementById('root')
);
