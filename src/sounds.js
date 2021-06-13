export default class Sounds {
  constructor () {
    this.theme = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/theme.wav', true);
    this.hit = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/hit.wav', false);
    this.break = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/break.wav', false);
    this.newBall = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/new-ball.wav', false);
    this.gameOver = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/game-over.wav', false);
    this.end = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/end.wav', false);
    this.nextLevel = this.addAudio('https://raw.githubusercontent.com/DaviCarvalho5/cool-paddle-game-2000/master/assets/sounds/next-level.wav', false);
   }

  play(sound) {
    sound.play();
  }
  stop(sound, reset = true) {
    sound.pause();
    (reset) ? sound.currentTime = 0 : 0;
  }

  addAudio(src, loop) {
    let sound = document.createElement('audio');
    sound.src = src;

    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");

    if (loop) {
      sound.setAttribute("loop", true);
    }

    sound.style.display = "none";
    document.body.appendChild(sound);

    return sound;
  }
}