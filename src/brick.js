import detectCollisionBallRect from './collisionDetection.js';

class Brick {
  constructor (game, position) {
    this.game = game;

    this.gameWidth = game.width;
    this.gameHeight = game.height;

    this.width = 120;
    this.height = 30;

    this.position = position;

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (detectCollisionBallRect(this.game.ball, this))
    {
      this.game.ball.inverteDirectionY();
      this.markedForDeletion = true;
      this.game.sounds.play(this.game.sounds.break);
    }
  }

  draw(context) {
    context.fillStyle = '#FFF';
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Brick;
