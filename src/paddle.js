
class Paddle {
  constructor (game) {
    this.gameWidth = game.width;
    this.gameHeight = game.height;
    
    this.width = 180;
    this.height = 8;

    this.maxSpeed = 200;
    this.speed = 0;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 100,
    };
  }

  draw(context) {
    context.fillStyle = '#FFFFFF';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = +this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(deltaTime) {
    this.position.x += this.speed / deltaTime;
    
    if (this.position.x <= 20) this.position.x = 20
    if (this.position.x >= this.gameWidth - this.width - 20) this.position.x = this.gameWidth - this.width - 20
  }
}

export default Paddle;