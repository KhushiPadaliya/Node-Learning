// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const games = {};
const gameHistory = [];
const gamePlayers = {};
const socketToGame = {};

let nextGameId = 1;

// Helpers ---------------------------------

function createNewGame() {
  const id = String(nextGameId++);

  const now = new Date(); // store JS Date (better for MySQL insertion)

  const game = {
    id,
    board: Array(9).fill(null),
    currentPlayer: 'X',
    active: true,
    winner: null,
    createdAt: now,
    updatedAt: now,
    endedAt: null,
  };

  games[id] = game;
  return game;
}

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWin(board, p) {
  return winningCombos.some(([a, b, c]) => board[a] === p && board[b] === p && board[c] === p);
}

function checkDraw(board) {
  return board.every(v => v !== null);
}

async function saveGameToDB(game) {
  const totalMoves = game.board.filter(v => v !== null).length;
  const finalBoard = game.board.map(v => v || '-').join('');

  try {
    await db.execute(
      `INSERT INTO games (game_uuid, winner, created_at, ended_at, total_moves, final_board)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        game.id,
        game.winner,
        new Date(game.createdAt),
        new Date(game.endedAt),
        totalMoves,
        finalBoard
      ]
    );
    console.log("Saved game to MySQL:", game.id);
  } catch (err) {
    console.error("Error saving game to MySQL:", err);
  }
}

function addGameToHistory(game) {
  gameHistory.push({
    id: game.id,
    winner: game.winner,
    createdAt: game.createdAt,
    endedAt: game.endedAt,
  });
  if (gameHistory.length > 100) gameHistory.shift();

  saveGameToDB(game);
}

// REST API -------------------------------------

app.get('/api/game/:id', (req, res) => {
  const game = games[req.params.id];
  if (!game) return res.status(404).json({ error: "Game not found" });
  return res.json({ game });
});

app.post('/api/new-game', (req, res) => {
  const game = createNewGame();
  return res.json({ game });
});

app.get('/api/recent-games', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT
         game_uuid AS id,
         winner,
         created_at AS createdAt,
         ended_at AS endedAt,
         total_moves AS totalMoves,
         final_board AS finalBoard
       FROM games
       ORDER BY ended_at DESC
       LIMIT 20`
    );
    res.json({ games: rows });
  } catch (err) {
    res.status(500).json({ error: "MySQL read failed" });
  }
});

// SOCKET.IO -------------------------------------

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
  console.log("Socket connected:", socket.id);

  socket.on("joinGame", ({ gameId }) => {
    const game = games[gameId];
    if (!game) {
      socket.emit("errorMessage", "Game not found");
      return;
    }

    let players = gamePlayers[gameId] || { X: null, O: null };
    let symbol = null;

    if (!players.X) {
      symbol = "X";
      players.X = socket.id;
    } else if (!players.O) {
      symbol = "O";
      players.O = socket.id;
    } else {
      socket.emit("errorMessage", "Game is full");
      return;
    }

    gamePlayers[gameId] = players;
    socketToGame[socket.id] = { gameId, symbol };

    socket.join(`game:${gameId}`);

    socket.emit("joinedGame", { gameId, symbol, game });
    io.to(`game:${gameId}`).emit("playerInfo", { players });
  });

  socket.on("makeMove", ({ index }) => {
    const info = socketToGame[socket.id];
    if (!info) return;

    const { gameId, symbol } = info;
    const game = games[gameId];
    if (!game || !game.active) return;

    if (game.currentPlayer !== symbol) return;
    if (game.board[index] !== null) return;

    game.board[index] = symbol;
    game.updatedAt = new Date();

    if (checkWin(game.board, symbol)) {
      game.active = false;
      game.winner = symbol;
      game.endedAt = new Date();
      addGameToHistory(game);
    } else if (checkDraw(game.board)) {
      game.active = false;
      game.winner = "draw";
      game.endedAt = new Date();
      addGameToHistory(game);
    } else {
      game.currentPlayer = symbol === "X" ? "O" : "X";
    }

    io.to(`game:${gameId}`).emit("gameState", { game });
  });

  socket.on("disconnect", () => {
    const info = socketToGame[socket.id];
    if (!info) return;

    const { gameId, symbol } = info;
    delete socketToGame[socket.id];

    const players = gamePlayers[gameId];
    if (players && players[symbol] === socket.id) {
      players[symbol] = null;
      io.to(`game:${gameId}`).emit("playerInfo", { players });
    }

    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () =>
  console.log(`Server running http://localhost:${PORT}`)
);
