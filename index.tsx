import './index.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { Stage, AppContext, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from './Background';
import { Rico } from './Rico';
import produce from 'immer';
import { height, width } from './constants';
import Orange from './Orange';
import load from './resources';
import { ResourceProvider } from './ResourceContext';

const getRandomId = (): number =>
  window.crypto.getRandomValues(new Uint32Array(1))[0];

interface Props {
  app: PIXI.Application;
}
enum GameState {
  Title,
  Game,
  GameOver,
}
interface OrangeState {
  x: number;
  y: number;
  isUp: boolean;
  orangeId: number;
}

interface State {
  vy: number;
  y: number;
  pressed: boolean;
  pressTime: number;
  gameState: GameState;
  oranges: OrangeState[];
  orangeTime: number;
}

const orangeDuration = 60;

const initialGameState: State = {
  vy: 0,
  y: height / 5,
  pressed: false,
  pressTime: -1,
  orangeTime: 0,
  oranges: [],
  gameState: GameState.Title,
};
const limitHeight = height - 20;
const orangeMoveSpeed = width / 100;
const moveOrange = (orange: OrangeState): OrangeState => ({
  ...orange,
  x: orange.x - orangeMoveSpeed,
});
const removeOrange = ({ x }: OrangeState): boolean => x > -width;
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
      const { y, vy, pressed, orangeTime, oranges } = this.state;

      const gameOver = y >= limitHeight;
      const nextY = Math.min(y + vy, limitHeight);
      const newOranges = oranges.map(moveOrange).filter(removeOrange);

      this.setState({
        y: nextY,
        vy: vy + 0.6,
        gameState: gameOver ? GameState.GameOver : gameState,
        oranges: newOranges,
        orangeTime: orangeTime + 1,
      });

      if (orangeTime + 1 >= orangeDuration) {
        const randomY = (Math.random() * height) / 3 + height / 3;
        const additionalOranges = new Array(2).fill(0).map(
          (_, i): OrangeState => ({
            x: width * 2,
            y: randomY + (i === 0 ? 0 : height / 3),
            isUp: i === 0,
            orangeId: getRandomId(),
          })
        );
        console.log(additionalOranges);
        console.log(oranges);
        this.setState(state => ({
          orangeTime: 0,
          oranges: [...state.oranges, ...additionalOranges],
        }));
      }

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
    const { y, vy, gameState, oranges } = this.state;
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
        <Orange x={0} y={0}/>
        {oranges.map(({ x, y, orangeId }) => (
          <Orange key={orangeId} x={x} y={y} />
        ))}
        <Rico x={(width * 5) / 18} y={y} rotation={Math.atan2(vy, 20)} />
      </Container>
    );
  }
}

(async () => {
  const resources = await load;
  render(
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0xaaaaff }}
    >
      <ResourceProvider resources={resources}>
        <AppContext.Consumer>{app => <App app={app} />}</AppContext.Consumer>
      </ResourceProvider>
    </Stage>,
    document.getElementById('root')
  );
})();
