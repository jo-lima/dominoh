// Imports
import { randomInteger } from "./helper.js";
import { rules } from "./config.js";

// HTML
const handContainerPlayer0 = document.querySelector(".pieces--player0");
const handContainerPlayer1 = document.querySelector(".pieces--player1");
const gameContainer = document.querySelector(".game-container");
const boardElement = document.querySelector(".board");

// Generate pieces
const pieces = [];
for (let baixo = 0; baixo <= 6; baixo++) {
  for (let cima = baixo; cima <= 6; cima++) {
    pieces.push([baixo, cima]);
  }
}

// Game
const game = {
  board: [],
  player0: {
    hand: [],
  },
  player1: {
    hand: [],
  },
};

let currentPlayer = 0;

// Fill hands
// prettier-ignore
const getRandomPiece = (pieces) => pieces.splice(randomInteger(0, pieces.length - 1), 1)[0];

function fillPlayersHands() {
  // Create pieces array copy
  const piecesLeft = [...pieces];

  for (let i = 0; i < rules.playerPiecesAmount; i++) {
    // Get player0 random piece
    game.player0.hand.push(getRandomPiece(piecesLeft));

    //Get player1 random piece
    game.player1.hand.push(getRandomPiece(piecesLeft));
  }
}

// Render hands
function createPiecesMarkup(hand) {
  // prettier-ignore
  // loop over hands array and generate markup
  const markup = hand.map(
    (piece) => `
    <div class="piece" data-value="${piece[0]}|${piece[1]}">
      <p class="piece-top piece-side">${piece[0]}</p>
      <p class="piece-bottom piece-side">${piece[1]}</p>
    </div>`
  );

  return markup.join("");
}

function renderPlayersHands() {
  // prettier-ignore
  handContainerPlayer0.insertAdjacentHTML("afterbegin",createPiecesMarkup(game.player0.hand)); // Render player0 hand
  // prettier-ignore
  handContainerPlayer1.insertAdjacentHTML("afterbegin",createPiecesMarkup(game.player1.hand)); // Render player1 hand
}

// Initialize
fillPlayersHands();
renderPlayersHands();
setActivePlayer(currentPlayer);

// Setting/switching players
function setActivePlayer(player) {
  // Remove old active player
  // prettier-ignore
  document.querySelector(`.player${player === 0 ? 1 : 0}`).classList.remove("player--active");

  // Set current active player
  document.querySelector(`.player${player}`).classList.add("player--active");
}

function switchPlayers() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  setActivePlayer(currentPlayer);
}

// Game
gameContainer.addEventListener("click", function (e) {
  // Filter pieces
  const pieceElement = e.target.closest(".piece");
  if (!pieceElement || !pieceElement.closest(".player--active")) return;

  // Add piece to board array
  const piece = pieceElement.dataset.value.split("|");
  game.board.push(piece);

  // Create and insert piece in board
  const newPiece = `
  <div class="board-piece" data-value="${piece[0]}|${piece[1]}">
    <p class="0-side board-piece-side">${piece[0]}</p>
    <p class="1-side board-piece-side">${piece[1]}</p>
  </div>`;
  boardElement.insertAdjacentHTML("afterbegin", newPiece);

  // Remove piece from hand
  pieceElement.remove();

  switchPlayers();
});
