const cells = document.querySelectorAll("[data-cell-index]");
const statusText = document.getElementById("statusText");
const restartButton = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameBoard;
let gameStatus;
let currentPlayer;

const startGame = () => {
  gameStatus = true;
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s Turn`;

  // go through each cell and add a eventlistener
  // only allow cell to be clicked once
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  // clear the cell HTML content
  cells.forEach((cell) => {
    cell.textContent = null;
  });
};

// Function to handle cell click
function handleCellClick(event) {
  if (gameStatus === true) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    // get cell index of clicked cell
    cellIndex = parseInt(cell.getAttribute("data-cell-index"), 10);
    // update gameboard
    gameBoard[cellIndex] = currentPlayer;
    checkWin();
    if (gameStatus === false) {
      return;
    } else {
      switchTurns();
      checkDraw();
      console.log(gameBoard);
    }
  }
}

function switchTurns() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

const checkWin = () => {
  WINNING_COMBINATIONS.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    ) {
      statusText.textContent = `${currentPlayer} won!!!`;
      gameStatus = false;
    }
  });
};

const checkDraw = () => {
  if (gameBoard.every((cell) => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameStatus = false;
  }
};

restartButton.addEventListener("click", startGame);

startGame();
