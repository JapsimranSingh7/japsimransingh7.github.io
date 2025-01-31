// DOM Elements
const welcomeScreen = document.getElementById("welcome");
const homeScreen = document.getElementById("home");
const ticTacToeMenu = document.getElementById("tic-tac-toe-menu");
const ticTacToeGame = document.getElementById("tic-tac-toe-game");
const playTicTacToeButton = document.getElementById("play-tic-tac-toe");
const withComputerButton = document.getElementById("with-computer");
const withFriendButton = document.getElementById("with-friend");
const board = document.querySelector(".board");

// Show Home Screen After Welcome
setTimeout(() => {
  welcomeScreen.style.display = "none";
  homeScreen.style.display = "flex";
}, 15000); // 15 seconds

// Navigate to Tic Tac Toe Menu
playTicTacToeButton.addEventListener("click", () => {
  homeScreen.style.display = "none";
  ticTacToeMenu.style.display = "flex";
});

// Start Game With Computer
withComputerButton.addEventListener("click", () => {
  startGame("computer");
});

// Start Game With Friend
withFriendButton.addEventListener("click", () => {
  startGame("friend");
});

// Start Game Logic
function startGame(mode) {
  ticTacToeMenu.style.display = "none";
  ticTacToeGame.style.display = "flex";

  board.innerHTML = "";
  const cells = Array(9).fill(null);
  let currentPlayer = "O";

  // Initial Background Color for Player O
  document.body.style.backgroundColor = "blue";

  // Create board cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => {
      if (!cell.textContent) {
        cell.textContent = currentPlayer;
        cells[i] = currentPlayer;

        const winner = checkWinner(cells);
        if (winner) {
          alert(`${winner} wins!`);
          resetGame();
          return;
        }

        if (!cells.includes(null)) {
          alert("BOTH LOSE!");
          resetGame();
          return;
        }

        // Switch Player
        currentPlayer = currentPlayer === "O" ? "X" : "O";
        document.body.style.backgroundColor =
          currentPlayer === "O" ? "blue" : "red";

        // If playing with computer
        if (mode === "computer" && currentPlayer === "X") {
          setTimeout(() => {
            const emptyIndices = cells
              .map((c, idx) => (c === null ? idx : null))
              .filter((idx) => idx !== null);
            const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            cells[move] = "X";
            board.children[move].textContent = "X";

            const winner = checkWinner(cells);
            if (winner) {
              alert(`${winner} wins!`);
              resetGame();
              return;
            }

            if (!cells.includes(null)) {
              alert("BOTH LOSE!");
              resetGame();
              return;
            }

            currentPlayer = "O";
            document.body.style.backgroundColor = "blue";
          }, 500);
        }
      }
    });
    board.appendChild(cell);
  }
}

function checkWinner(cells) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function resetGame() {
  setTimeout(() => {
    ticTacToeGame.style.display = "none";
    homeScreen.style.display = "flex";
    document.body.style.backgroundColor = "lightbrown";
  }, 4000);
}
