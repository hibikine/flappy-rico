import './index.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { Stage, AppContext, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Background } from './Background';
import { Rico } from './Rico';
import produce from 'immer';
import { height, width } from './constants';

interface Props {
  app: PIXI.Application;
}
enum GameState {
  Title,
  Game,
  GameOver,
}

interface State {
  vy: number;
  y: number;
  pressed: boolean;
  pressTime: number;
  gameState: GameState;
}

const initialGameState: State = {
  vy: 0,
  y: height / 5,
  pressed: false,
  pressTime: -1,
  gameState: GameState.Title,
};
const limitHeight = height - 20;
class App extends React.Component<Props, State> {
  state = produce(initialGameState, _ => {});
  gameInit() {
    this.setState(
      produce(initialGameState, s => {
        s.gameState = GameState.Game;
      })
    );
  }
  handleClick = () => {
    const { gameState } = this.state;
    if (gameState === GameState.Title) {
      this.gameInit();
    } else if (gameState === GameState.Game) {
      this.setState({ pressTime: 0, vy: -11, pressed: true });
    } else if (gameState === GameState.GameOver) {
      this.gameInit();
    }
  };
  handlePointerUp = () => {
    this.setState({ pressed: false });
  };
  handleTick = () => {
    const { gameState } = this.state;
    if (gameState === GameState.Game) {
      const { y, vy, pressed } = this.state;

      const gameOver = y >= limitHeight;
      const nextY = Math.min(y + vy, limitHeight);

      this.setState({
        y: nextY,
        vy: vy + 0.6,
        gameState: gameOver ? GameState.GameOver : gameState,
      });

      if (pressed) {
        const { pressTime } = this.state;
        const pressAccel = Math.max(0, 5 - pressTime);
        this.setState(state => ({
          vy: state.vy - pressAccel,
          pressTime: pressTime + 1,
        }));
      }
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
    const { y, vy, gameState } = this.state;
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
          stop={gameState !== GameState.Game}
        />
        <Rico x={(width * 5) / 18} y={y} rotation={Math.atan2(vy, 20)} />
      </Container>
    );
  }
}
render(
  <Stage width={width} height={height} options={{ backgroundColor: 0xaaaaff }}>
    <AppContext.Consumer>{app => <App app={app} />}</AppContext.Consumer>
  </Stage>,
  document.getElementById('root')
);
