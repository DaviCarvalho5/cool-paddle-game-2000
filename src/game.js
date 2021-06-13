
import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js';
import HUD from './hud.js'
import Sounds from './sounds.js'
import { buildLevel, level1, level2, level3 } from './levels.js'

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEXT_LEVEL: 4,
  END: 5,
};

class Game {
  constructor (gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.hud = new HUD(this);
    this.sounds = new Sounds();

    this.levels = [level1, level2, level3];
    this.level = 1;
    this.finalLevel = this.levels.length;
    this.bricks = [];

    new InputHandler(this);

    this.gameState = GAME_STATE.MENU;
  }
  
  start() {
    if (this.gameState !== GAME_STATE.MENU && 
      this.gameState !== GAME_STATE.GAME_OVER && 
      this.gameState !== GAME_STATE.NEXT_LEVEL) return;

    if (this.gameState === GAME_STATE.MENU) {
      this.level = 1;
    }

    this.sounds.play(this.sounds.theme);

    this.ball.setRandomPosition();
    this.lives = 2;
    this.gameState = GAME_STATE.RUNNING;
    this.bricks = buildLevel(this, this.levels[this.level - 1]);
    this.gameObjects = [this.paddle, this.ball, this.hud, ...this.bricks];
  }

  backToMenu() {
    if (this.gameState === GAME_STATE.MENU) return;

    this.sounds.stop(this.sounds.theme);
    this.gameState = GAME_STATE.MENU;
  }

  reset() {
    this.sounds.play(this.sounds.newBall);
    this.ball.setRandomPosition();
    this.ball.resetSpeed()
  }

  update(deltaTime) {
    
    if (this.lives <= 0 && this.gameState !== GAME_STATE.GAME_OVER) {
      this.sounds.play(this.sounds.gameOver);
      this.sounds.stop(this.sounds.theme);
      this.gameState = GAME_STATE.GAME_OVER
    };
    
    if (this.gameState !== GAME_STATE.RUNNING && this.gameState !== GAME_STATE.NEXT_LEVEL) return;

    if (this.gameState === GAME_STATE.NEXT_LEVEL) {

      if (this.level == this.finalLevel && this.gameState !== GAME_STATE.END) {
        this.sounds.play(this.sounds.end);
        this.sounds.stop(this.sounds.theme);
        this.gameState = GAME_STATE.END;
        return;
      }

      this.level += 1;
      this.start();
      this.gameState = GAME_STATE.RUNNING;
    }
      
    if (this.bricks.length == 0) {
      this.gameState = GAME_STATE.NEXT_LEVEL
      this.sounds.play(this.sounds.nextLevel);
    }

    this.gameObjects.forEach(obj => obj.update(deltaTime));

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    this.gameObjects = this.gameObjects.filter(obj => !obj.markedForDeletion);
  }

  draw(context) {
    if (this.gameState == GAME_STATE.MENU) {
      context.fillStyle = '#1E1647';
      context.fillRect(0, 0, this.width, this.height);

      context.font = 'bold 50px monospace';
      context.fillStyle = '#FFF';
      context.textAlign = 'center';

      context.fillText('[ COOL PADDLE GAME 2000 ]', this.width / 2, 80);

      context.font = 'normal 40px monospace';
      context.fillText('Press [SPACEBAR] to start!', this.width / 2, this.height / 2 - 20);

      context.font = '20px monospace';
      context.fillText('You can pause with [ESCAPE] and back to Menu with [M].', this.width / 2, this.height / 2 + 28);

      context.font = '20px monospace';
      context.fillStyle = '#614AD3';
      context.fillText('Created by: Davi de Carvalho', this.width / 2, this.height - 76);
      context.fillText('Find me on GitHub as @davicarvalho5', this.width / 2, this.height - 48);

      return;
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      context.fillStyle = '#614AD3';
      context.fillRect(0, 0, this.width, this.height);

      context.font = 'bold 50px monospace';
      context.fillStyle = '#FFF';
      context.textAlign = 'center';

      context.fillText('[ COOL PADDLE GAME 2000 ]', this.width / 2, 80);

      context.font = 'normal 40px monospace';
      context.fillText('GAME OVER!', this.width / 2, this.height / 2 - 20);

      context.font = '20px monospace';
      context.fillText('Press [SPACEBAR] to restart.', this.width / 2, this.height / 2 + 28);

      context.font = '20px monospace';
      context.fillStyle = '#1E1647';
      context.fillText('Created by: Davi de Carvalho', this.width / 2, this.height - 76);
      context.fillText('Find me on GitHub as @davicarvalho5', this.width / 2, this.height - 48);

      return;
    }

    if (this.gameState === GAME_STATE.END) {

      context.fillStyle = '#614AD3';
      context.fillRect(0, 0, this.width, this.height);

      context.font = 'bold 50px monospace';
      context.fillStyle = '#FFF';
      context.textAlign = 'center';

      context.fillText('[ COOL PADDLE GAME 2000 ]', this.width / 2, 80);

      context.font = 'normal 40px monospace';
      context.fillText('CONGRATULATIONS! YOU OWN THE GAME!', this.width / 2, this.height / 2 - 20);

      context.font = '20px monospace';
      context.fillText('Press [M] to back to Menu.', this.width / 2, this.height / 2 + 28);

      context.font = '20px monospace';
      context.fillStyle = '#1E1647';
      context.fillText('Created by: Davi de Carvalho', this.width / 2, this.height - 76);
      context.fillText('Find me on GitHub as @davicarvalho5', this.width / 2, this.height - 48);

      return;
    }

    this.gameObjects.forEach(obj => obj.draw(context));

    if (this.gameState === GAME_STATE.PAUSED) {
      context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      context.fillRect(0, 0, this.width, this.height);

      context.font = '40px monospace';
      context.fillStyle = '#FFF';
      context.textAlign = 'center';
      context.fillText('[ PAUSED ]', this.width / 2, this.height / 2);
    }
  }

  togglePause() {
    if(this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
      this.sounds.play(this.sounds.theme);
    } else {
      this.gameState = GAME_STATE.PAUSED;
      this.sounds.stop(this.sounds.theme, false);
    }
  }
}

export default Game;