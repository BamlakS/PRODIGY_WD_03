document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const startButton = document.getElementById('start-game');
    const playerSelection = document.getElementById('player-selection');
    const resultDisplay = document.getElementById('result');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let userPlayer = 'X';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    startButton.addEventListener('click', () => {
        userPlayer = document.getElementById('player').value;
        currentPlayer = userPlayer;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        board.style.display = 'grid';
        restartButton.style.display = 'inline-block';
        playerSelection.style.display = 'none';
        resultDisplay.style.display = 'none';
    });

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');
        if (gameState[index] !== '' || checkWinner()){
            return;
        }
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner()){
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            resultDisplay.style.display = 'block';
        }else if (gameState.every(cell => cell !== '')){
            resultDisplay.textContent = 'Draw!';
            resultDisplay.style.display = 'block';
        }else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWinner = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const restartGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = userPlayer;
        cells.forEach(cell => cell.textContent = '');
        playerSelection.style.display = 'block';
        board.style.display = 'none';
        restartButton.style.display = 'none';
        resultDisplay.style.display = 'none';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});