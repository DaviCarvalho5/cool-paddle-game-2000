export default class Sounds {
  constructor () {
    this.theme = this.addAudio('../assets/sounds/theme.wav', true);
    this.hit = this.addAudio('../assets/sounds/hit.wav', false);
    this.break = this.addAudio('../assets/sounds/break.wav', false);
    this.newBall = this.addAudio('../assets/sounds/new-ball.wav', false);
    this.gameOver = this.addAudio('../assets/sounds/game-over.wav', false);
    this.end = this.addAudio('../assets/sounds/end.wav', false);
    this.nextLevel = this.addAudio('../assets/sounds/next-level.wav', false);
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