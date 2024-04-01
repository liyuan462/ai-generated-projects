document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("gomoku-board");
  const playerTurn = document.getElementById("player-turn");
  const resetGameBtn = document.getElementById("reset-game");
  const boardSize = 15;
  let gameState = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
  let currentPlayer = "black";
  let gameActive = true;

 const updatePlayerTurn = () => {
  playerTurn.textContent = `${currentPlayer.toUpperCase()}'s turn`;
};

const resetGame = () => {
  gameState = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
  currentPlayer = "black";
  gameActive = true;
  board.innerHTML = '';
  initializeBoard();
  updatePlayerTurn();
};

const placePiece = (x, y) => {
  if (!gameActive || gameState[x][y] !== null) return;

  gameState[x][y] = currentPlayer;
  const cell = document.createElement("div");
  cell.className = `piece ${currentPlayer}`;
  board.children[x * boardSize + y].appendChild(cell);

  if (checkWin(x, y)) {
    alert(`${currentPlayer.toUpperCase()} wins!`);
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "black" ? "white" : "black";
  updatePlayerTurn();
};


    const checkWin = (x, y) => {
  const directions = [
    { dx: 1, dy: 0 },  // Horizontal
    { dx: 0, dy: 1 },  // Vertical
    { dx: 1, dy: 1 },  // Diagonal (down-right)
    { dx: 1, dy: -1 }  // Diagonal (up-right)
  ];

  const inBounds = (x, y) => x >= 0 && x < boardSize && y >= 0 && y < boardSize;

  for (let {dx, dy} of directions) {
    let count = 1;  // Count the current piece
    let [nx, ny] = [x + dx, y + dy];

    // Check in one direction
    while (inBounds(nx, ny) && gameState[nx][ny] === currentPlayer) {
      count++;
      nx += dx;
      ny += dy;
    }

    [nx, ny] = [x - dx, y - dy];

    // Check in the opposite direction
    while (inBounds(nx, ny) && gameState[nx][ny] === currentPlayer) {
      count++;
      nx -= dx;
      ny -= dy;
    }

    if (count >= 5) return true;
  }

  return false;
};

const initializeBoard = () => {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => placePiece(x, y));
      board.appendChild(cell);
    }
  }
};

     resetGameBtn.addEventListener("click", resetGame);
  initializeBoard();
  updatePlayerTurn();


});

