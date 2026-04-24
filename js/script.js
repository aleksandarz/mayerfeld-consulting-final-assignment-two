import { startGame, jump, playMusic } from './game.js';

const retryButton = document.getElementById('retry-action');

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    startGame();
    startButton.style.display = 'none';
    playMusic();
}); 

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});


retryButton.addEventListener('click', () => {
    startGame();
    playMusic();
});