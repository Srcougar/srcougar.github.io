const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isAI = false; // Indica si el jugador está jugando contra la IA
const gameBoard = document.getElementById('game-board');
const winnerMessage = document.getElementById('winner-message');
const resetButton = document.getElementById('reset-button');
const backButton = document.getElementById('back-button');
const menu = document.getElementById('menu');
const game = document.getElementById('game');

// Botones del menú
document.getElementById('play-friend').addEventListener('click', () => startGame(false));
document.getElementById('play-ai').addEventListener('click', () => startGame(true));

// Volver al menú
backButton.addEventListener('click', () => {
    game.style.display = 'none';
    menu.style.display = 'block';
});

// Reiniciar el juego
resetButton.addEventListener('click', resetBoard);

// Inicia el juego
function startGame(againstAI) {
    isAI = againstAI;
    menu.style.display = 'none';
    game.style.display = 'block';
    resetBoard();
}

// Crear el tablero
function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    });
}

// Manejar clic en las celdas
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || checkWinner()) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        winnerMessage.textContent = `${currentPlayer} gana!`;
    } else if (board.every(cell => cell !== '')) {
        winnerMessage.textContent = '¡Es un empate!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Turno de la IA si está activa
        if (isAI && currentPlayer === 'O') {
            aiMove();
        }
    }
}

// Movimiento de la IA
function aiMove() {
    const emptyCells = board
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    // Escoge una celda vacía al azar
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';

    // Actualiza la celda en la interfaz
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = 'O';

    if (checkWinner()) {
        winnerMessage.textContent = 'O gana!';
    } else if (board.every(cell => cell !== '')) {
        winnerMessage.textContent = '¡Es un empate!';
    } else {
        currentPlayer = 'X';
    }
}

// Comprobar ganador
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

// Reiniciar el tablero
function resetBoard() {
    board.fill('');
    currentPlayer = 'X';
    winnerMessage.textContent = '';
    createBoard();
}

// Inicializar el menú
menu.style.display = 'block';
game.style.display = 'none';