import detectCollisionBallRect from './collisionDetection.js';

class Ball {
  constructor (game) {
    this.gameWidth = game.width;
    this.gameHeight = game.height;

    this.paddle = game.paddle;

    this.game = game;

    this.imgBall = document.getElementById('ball-img');
    this.diameter = 20;

    this.setRandomPosition();
    this.resetSpeed();
  }

  resetSpeed() {
    this.speed = { x: 120, y: -80 };
  }

  setRandomPosition() {
    this.position = this.getRandomPosition();
  }

  getRandomPosition() {
    let pos = {
      x: (Math.random() * this.gameWidth - 2 * this.diameter) + this.diameter,
      y: Math.random() * 100 + 250,
    }

    return pos;
  }

  draw(context) {
    context.drawImage(this.imgBall, this.position.x, this.position.y, this.diameter, this.diameter);
  }

  update(deltaTime) {

    if (this.position.x >= this.gameWidth - this.diameter || this.position.x <= 0) {
      this.speed.x = - this.speed.x;
      this.game.sounds.play(this.game.sounds.hit);
    }

    if (this.position.y <= 0) {
      this.speed.y = - this.speed.y;
      this.game.sounds.play(this.game.sounds.hit);
    }

    if (this.position.y >= this.gameHeight - this.diameter) {
      this.game.lives -= 1;
      this.game.reset();
    }

    let bottomOfBall = this.position.y + this.diameter;
    let topOfPaddle = this.paddle.position.y;
    let leftSideOfPaddle = this.paddle.position.x;
    let rightSideOfPaddle = this.paddle.position.x + this.paddle.width;

    if (detectCollisionBallRect(this, this.paddle)) {
      this.inverteDirectionY()
      this.game.sounds.play(this.game.sounds.hit);
    }

    this.position.x += this.speed.x/deltaTime
    this.position.y += this.speed.y/deltaTime
  }

  inverteDirectionY() {
    this.speed.y = - this.speed.y;
  }
}

export default Ball;