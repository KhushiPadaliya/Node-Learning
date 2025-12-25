console.log("Multiplayer client loaded");

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const playerInfoEl = document.getElementById("player-info");
const shareLinkEl = document.getElementById("share-link");
const newGameBtn = document.getElementById("new-game");

let socket = null;
let currentGameId = null;
let board = Array(9).fill(null);
let currentPlayer = "X";
let mySymbol = null;
let gameActive = false;
let playersInfo = { X: false, O: false };

function updateStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}
function renderBoard() {
  document.querySelectorAll(".cell").forEach(c => {
    const i = Number(c.getAttribute("data-index"));
    c.textContent = board[i] || "";
  });
}
function applyGame(game) {
  currentGameId = game.id;
  board = game.board;
  currentPlayer = game.currentPlayer;
  gameActive = game.active;

  renderBoard();

  if (!game.active) {
    updateStatus(game.winner === "draw" ? "Draw!" : `Player ${game.winner} wins!`);
  } else {
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  updateShareLink();
}
function updatePlayerInfo() {
  if (!mySymbol) {
    playerInfoEl.textContent = "Connecting...";
    return;
  }
  const x = playersInfo.X ? "connected" : "waiting";
  const o = playersInfo.O ? "connected" : "waiting";
  playerInfoEl.textContent = `You are ${mySymbol}. X: ${x}, O: ${o}`;
}
function updateShareLink() {
  if (!currentGameId) return;
  const url = new URL(location.href);
  url.searchParams.set("gameId", currentGameId);
  shareLinkEl.textContent = url.toString();
}

// REST (only for loading/creating game initially)
async function createGame() {
  const res = await fetch("/api/new-game", { method: "POST" });
  const data = await res.json();
  applyGame(data.game);
  connectSocket(data.game.id);
}
async function loadGame(gameId) {
  const res = await fetch(`/api/game/${gameId}`);
  const data = await res.json();
  applyGame(data.game);
  connectSocket(gameId);
}

// SOCKET.IO
function connectSocket(gameId) {
  if (socket) return;
  socket = io();

  socket.on("connect", () => {
    socket.emit("joinGame", { gameId });
  });

  socket.on("joinedGame", ({ gameId, symbol, game }) => {
    mySymbol = symbol;
    applyGame(game);
    updatePlayerInfo();
  });

  socket.on("playerInfo", ({ players }) => {
    playersInfo = players;
    updatePlayerInfo();
  });

  socket.on("gameState", ({ game }) => {
    applyGame(game);
    updatePlayerInfo();
  });

  socket.on("errorMessage", msg => updateStatus(msg));
}

boardEl.addEventListener("click", e => {
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;
  if (!socket || !mySymbol || !gameActive) return;

  const index = Number(cell.getAttribute("data-index"));
  if (board[index] !== null) return;

  socket.emit("makeMove", { index });
});

newGameBtn.addEventListener("click", () => createGame());

// On page load
(function init() {
  const params = new URLSearchParams(location.search);
  const gameId = params.get("gameId");

  if (gameId) loadGame(gameId);
  else createGame();
})();
