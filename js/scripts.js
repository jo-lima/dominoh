import { randomInteger } from "./helper.js";
import { rules } from "./config.js";

// Generate pieces
const pieces = [];
for (let baixo = 0; baixo <= 6; baixo++) {
  for (let cima = baixo; cima <= 6; cima++) {
    pieces.push([baixo, cima]);
  }
}

// Game
const game = {
  player0: {
    hand: [],
  },
  player1: {
    hand: [],
  },
};

let currentPlayer = 0;

// [Fill hands]
const getRandomPiece = (pieces) =>
  pieces.splice(randomInteger(0, pieces.length - 1), 1)[0];

function fillPlayersHands() {
  // Create pieces array copy
  const piecesLeft = [...pieces];

  for (let i = 0; i < rules.playerPiecesAmount; i++) {
    // Get player0 random piece
    const piece1 = getRandomPiece(piecesLeft);
    game.player0.hand.push(piece1);

    //Get player1 random piece
    const piece2 = getRandomPiece(piecesLeft);
    game.player1.hand.push(piece2);
  }
  console.log(piecesLeft, piecesLeft.length);
  console.log(game.player0.hand, game.player1.hand);
}

// [Render hands]
const createPieceMarkup = (hand, index) =>
  `<div class="piece" data-value="0">
    <p class="piece-top">${hand[index][0]}</p>
    <p class="piece-bottom">${hand[index][1]}</p>
   </div>`;

const handContainerPlayer0 = document.querySelector(".pieces--player0");
const handContainerPlayer1 = document.querySelector(".pieces--player1");
function renderPlayersHands() {
  for (let i = 0; i < rules.playerPiecesAmount; i++) {
    //prettier-ignore
    handContainerPlayer0.insertAdjacentHTML(
      "afterbegin",
      createPieceMarkup(game.player0.hand, i)
    );

    handContainerPlayer1.insertAdjacentHTML(
      "afterbegin",
      createPieceMarkup(game.player1.hand, i)
    );
  }
}

fillPlayersHands();
renderPlayersHands();

function xisde(hand) {
  const markup = hand.map(
    (piece) => `<div class="piece" data-value="0">
    <p class="piece-top">${piece[0]}</p>
    <p class="piece-bottom">${piece[1]}</p>
   </div>`
  );

  console.log(markup.join(""));
}

xisde(game.player0.hand);
