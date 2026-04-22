const currentTallyDisplay = document.getElementById('current-tally');
const finalTallyDisplay = document.getElementById('final-tally');
const matchOverModal = document.getElementById('match-over-modal');
const retryButton = document.getElementById('retry-action');

let score = 0;
let isGameRunning = false;

function startGame() {
    isGameRunning = true;
    score = 0;
    currentTallyDisplay.innerText = score;
    matchOverModal.classList.add('hidden');
}

function addPoint() {
    if (isGameRunning) {
        score++;
        currentTallyDisplay.innerText = score;
    }
}

function endGame() {
    isGameRunning = false;
    
    finalTallyDisplay.innerText = score;
    matchOverModal.classList.remove('hidden');
}

retryButton.addEventListener('click', () => {
    startGame();
});

startGame();