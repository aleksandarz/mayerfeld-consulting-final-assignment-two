const arena = document.getElementById('jump-arena');

const currentTallyDisplay = document.getElementById('current-tally');
const finalTallyDisplay = document.getElementById('final-tally');
const matchOverModal = document.getElementById('match-over-modal');

let score = 0;
let isGameRunning = false;

let isJumping = false;
let velocity = 0;
let position = 0;

const gravity = 0.6;
const jumpPower = 12;

const player = document.createElement('div');
player.id = 'player';
arena.appendChild(player);

player.style.position = 'absolute';
player.style.bottom = '0px';
player.style.left = '50px';
player.style.width = '30px';
player.style.height = '30px';
player.style.backgroundColor = '#ff4757';

export const startGame = () => {
  isGameRunning = true;
  score = 0;

  currentTallyDisplay.innerText = score;
  matchOverModal.classList.add('hidden');

  position = 0;
  velocity = 0;
  isJumping = false;
  player.style.bottom = '0px';
};

export const endGame = () => {
  isGameRunning = false;

  finalTallyDisplay.innerText = score;
  matchOverModal.classList.remove('hidden');
};

export const addPoint = () => {
  if (!isGameRunning) return;

  score++;
  currentTallyDisplay.innerText = score;
};

export const jump = () => {
  if (!isGameRunning || isJumping) return;

  isJumping = true;
  velocity = jumpPower;
};

const update = () => {
  if (isGameRunning) {
    velocity -= gravity;
    position += velocity;

    if (position <= 0) {
      position = 0;
      velocity = 0;
      isJumping = false;
    }

    player.style.bottom = position + 'px';
  }

  requestAnimationFrame(update);
};

update();