/** @type {HTMLCanvasElement} */

import Game from './game.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const GAME_SCREEN_WIDTH = 800;
const GAME_SCREEN_HEIGHT = 600;

let game = new Game(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);

let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0, 0, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
    context.fillStyle = '#1E1647';
    context.fillRect(0, 0, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);

    game.update(deltaTime);
    game.draw(context);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);