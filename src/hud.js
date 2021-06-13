export default class HUD {
  constructor (game) {
    this.width = game.width;
    this.height = 40;

    this.game = game;
  }
  
  update (deltaTime) {

  }

  draw (context) {
    context.fillStyle = '#614AD3';
    context.fillRect(0, this.game.height - this.height, this.width, this.height);

    context.font = '20px monospace';
    context.fillStyle = '#FFF';
    context.textAlign = 'left';

    context.fillText(`[ COOL PADDLE GAME 2000 ]`, 8, this.game.height - this.height + 25);

    context.textAlign = 'right';

    context.fillText(
      `[Lives]: ${this.game.lives}/2   [Level]: ${this.game.level}/3`,
      this.width - 8, this.game.height - this.height + 25
      );
  }
}