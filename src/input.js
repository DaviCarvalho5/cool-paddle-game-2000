
class InputHandler {
  constructor (game) {
    this.game = game;
    this.paddle = game.paddle;

    document.addEventListener("keydown", (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.paddle.moveLeft();
          break;
         
        case 'a':
          this.paddle.moveLeft();
          break;

        case 'ArrowRight':
          this.paddle.moveRight();
          break;

        case 'd':
          this.paddle.moveRight();
          break;
        
        case 'Escape':
          game.togglePause();
          break;

        case ' ':
          game.start();
          break;

        case 'm':
          game.backToMenu();
          break;
      }
    })

    document.addEventListener("keyup", (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          if (this.paddle.speed > 0) return;
          this.paddle.stop();
          break;

        case 'a':
          if (this.paddle.speed > 0) return;
          this.paddle.stop();
          break;

        case 'ArrowRight':
          if (this.paddle.speed < 0) return;
          this.paddle.stop();
          break;
        
        case 'd':
          if (this.paddle.speed < 0) return;
          this.paddle.stop();
          break;
      }
    })
  }
}

export default InputHandler;