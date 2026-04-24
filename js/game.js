const arena = document.getElementById('jump-arena');

const currentTallyDisplay = document.getElementById('current-tally');
const finalTallyDisplay = document.getElementById('final-tally');
const matchOverModal = document.getElementById('match-over-modal');

const scoreSound = new Audio('../sounds/jump.mp3'); 
const bgMusic = new Audio('../sounds/game.mp3'); 
bgMusic.loop = true;
bgMusic.volume = 0.2;

let score = 0;
let isGameRunning = false;
let isJumping = false;
let jumpCount = 0; 
let velocity = 0;
let position = 30; 
let rotation = 0; 

const gravity = 0.8; 
const jumpPower = 14; 
const doubleJumpPower = 12; 

const player = document.createElement('div');
player.id = 'player';
arena.appendChild(player);

player.style.position = 'absolute';
player.style.bottom = '20px'; 
player.style.left = '50px';
player.style.width = '70px';
player.style.height = '70px';
player.style.backgroundImage= "url('../images/player.png')";
player.style.backgroundSize = 'cover';
player.style.zIndex = '10'; 

let spawnTimer;

export const playMusic = () => {
  bgMusic.currentTime = 0;
  bgMusic.play().catch(e => console.log("Music blocked:", e));
};

export const startGame = () => {
  isGameRunning = true;
  score = 0;
  currentTallyDisplay.innerText = score;
  matchOverModal.classList.add('hidden');
  position = 30; 
  velocity = 0;
  rotation = 0; 
  isJumping = false;
  jumpCount = 0; 
  player.style.bottom = '20px'; 
  player.style.transform = `rotate(0deg)`; 
  
  document.querySelectorAll('.cactus').forEach(c => c.remove()); 
  spawnLoop(); 
};

const spawnLoop = () => {
  if (!isGameRunning) return;
  createCactus();
  const minDelay = Math.max(400, 700 - (score * 5)); 
  const maxDelay = Math.max(800, 2000 - (score * 10)); 
  const nextSpawn = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
  spawnTimer = setTimeout(spawnLoop, nextSpawn);
};

const createCactus = () => {
  if (!isGameRunning) return;
  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  arena.appendChild(cactus);
  const cactusHeight = Math.floor(Math.random() * (75 - 35 + 1)) + 35; 
  const cactusWidth = Math.floor(cactusHeight * 1.2); 
  let cactusLeft = 600; 
  let hasScored = false; 
  const currentSpeed = 6 + Math.floor(score / 5); 

  cactus.style.position = 'absolute';
  cactus.style.bottom = '30px'; 
  cactus.style.left = cactusLeft + 'px';
  cactus.style.width = cactusWidth + 'px'; 
  cactus.style.height = cactusHeight + 'px'; 
  cactus.style.backgroundImage = "url('../images/cactus.png')";
  cactus.style.backgroundSize = 'contain'; 
  cactus.style.backgroundRepeat = 'no-repeat'; 
  cactus.style.backgroundPosition = 'center'; 
  cactus.style.zIndex = '9';

  const moveCactus = setInterval(() => {
    if (!isGameRunning) {
      clearInterval(moveCactus);
      cactus.remove();
      return;
    }
    cactusLeft -= currentSpeed; 
    cactus.style.left = cactusLeft + 'px';
    const playerRight = 110; 
    const playerLeft = 50;
    if (cactusLeft < playerRight - 15 && cactusLeft + (cactusWidth * 0.75) > playerLeft + 15 && position < 20 + cactusHeight - 5) { 
      endGame();
      clearInterval(moveCactus);
    }
    if (!hasScored && cactusLeft < 50 && position > 20) { 
      hasScored = true; 
      addPoint();
      scoreSound.currentTime = 0; 
      scoreSound.play().catch(e => {}); 
    }
    if (cactusLeft < -cactusWidth) { 
      clearInterval(moveCactus);
      cactus.remove();
    }
  }, 20);
};

export const endGame = () => {
  isGameRunning = false;
  clearTimeout(spawnTimer); 
  bgMusic.pause(); // Music still stops on lose
  finalTallyDisplay.innerText = score;
  matchOverModal.classList.remove('hidden');
};

export const addPoint = () => {
  if (!isGameRunning) return;
  score++;
  currentTallyDisplay.innerText = score;
};

export const jump = () => {
  if (!isGameRunning) return;
  if (!isJumping) {
    isJumping = true;
    jumpCount = 1;
    velocity = jumpPower;
  } else if (jumpCount === 1) {
    jumpCount = 2;
    velocity = doubleJumpPower; 
  }
};

const update = () => {
  if (isGameRunning) {
    velocity -= gravity;
    position += velocity;
    if (isJumping && jumpCount === 2) {
      rotation += 12; 
      player.style.transform = `rotate(${rotation}deg)`;
    }
    if (position <= 20) { 
      position = 20; velocity = 0; isJumping = false; jumpCount = 0; rotation = 0; 
      player.style.transform = `rotate(0deg)`;
    }
    player.style.bottom = position + 'px';
  }
  requestAnimationFrame(update);
};

update();