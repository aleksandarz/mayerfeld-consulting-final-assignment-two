import { startGame, jump, addPoint } from './game.js';

const retryButton = document.getElementById('retry-action');

startGame();

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

setInterval(() => {
    addPoint();
}, 100);

retryButton.addEventListener('click', () => {
    startGame();
});