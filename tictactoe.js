const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let moves = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function computerMove() {
    let availableMoves = gameBoard
        .map((cell, index) => cell === '' ? index : null)
        .filter(index => index !== null);

    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[move] = 'O';
    document.querySelector(`[data-index="${move}"]`).textContent = 'O';
    moves++;
    if (checkWin()) {
        message.textContent = 'Computer wins!';
    } else if (moves === 9) {
        message.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = 'X';
    }
}

function handleClick(e) {
    let index = e.target.dataset.index;
    if (gameBoard[index] === '' && !message.textContent) {
        gameBoard[index] = 'X';
        e.target.textContent = 'X';
        moves++;
        if (checkWin()) {
            message.textContent = 'Player wins!';
        } else if (moves < 9) {
            currentPlayer = 'O';
            setTimeout(computerMove, 500);
        } else {
            message.textContent = 'It\'s a draw!';
        }
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

createBoard();
