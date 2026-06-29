const cardItems = [
  // To use images later, put files in e.g. assets/cards/ and set image: "assets/cards/name.png".
  { id: "anvil", label: "Nakovadlina", symbol: "A", image: null },
  { id: "hammer", label: "Kladivo", symbol: "K", image: null },
  { id: "tongs", label: "Klieste", symbol: "Kl", image: null },
  { id: "forge", label: "Vyhen", symbol: "V", image: null },
  { id: "coal", label: "Uhlie", symbol: "U", image: null },
  { id: "iron", label: "Zelezo", symbol: "Fe", image: null },
  { id: "spark", label: "Iskra", symbol: "*", image: null },
  { id: "horseshoe", label: "Podkova", symbol: "P", image: null },
  { id: "bellows", label: "Mech", symbol: "M", image: null },
  { id: "chisel", label: "Sekac", symbol: "S", image: null },
  { id: "water", label: "Kaliaca voda", symbol: "H2O", image: null },
  { id: "file", label: "Pilnik", symbol: "Pi", image: null },
  { id: "rivet", label: "Nit", symbol: "N", image: null },
  { id: "apron", label: "Zastera", symbol: "Z", image: null },
  { id: "gloves", label: "Rukavice", symbol: "R", image: null },
  { id: "flame", label: "Plamen", symbol: "F", image: null },
];

const board = document.querySelector("#game-board");
const movesEl = document.querySelector("#moves");
const matchesEl = document.querySelector("#matches");
const timerEl = document.querySelector("#timer");
const pairTotalEl = document.querySelector("#pair-total");
const newGameButton = document.querySelector("#new-game");
const playAgainButton = document.querySelector("#play-again");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let seconds = 0;
let timerId = null;
let cardCount = 16;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

function startTimer() {
  if (timerId) {
    return;
  }

  timerId = window.setInterval(() => {
    seconds += 1;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function cardFaceContent(item) {
  if (item.image) {
    return `<img class="card-image" src="${item.image}" alt="${item.label}" />`;
  }

  return `<span class="card-symbol" aria-hidden="true">${item.symbol}</span>`;
}

function createCard(item, index) {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.dataset.cardId = item.id;
  card.setAttribute("aria-label", `Karta ${index + 1}: ${item.label}`);

  card.innerHTML = `
  <span class="card-inner">
    <span class="card-back" aria-hidden="true">
     <img src="assets/images/stol_trencin_logo.svg" alt="Logo">
    </span>
    <span class="card-face">
      ${cardFaceContent(item)}
    </span>
  </span>
`;

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    lockBoard ||
    card === firstCard ||
    card.classList.contains("is-matched")
  ) {
    return;
  }

  startTimer();
  card.classList.add("is-flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves += 1;
  movesEl.textContent = moves;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.cardId === secondCard.dataset.cardId;

  if (isMatch) {
    firstCard.classList.add("is-matched");
    secondCard.classList.add("is-matched");
    matches += 1;
    matchesEl.textContent = matches;
    resetTurn();
    checkWin();
    return;
  }

  lockBoard = true;
  window.setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    resetTurn();
  }, 780);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  if (matches !== cardCount / 2) {
    return;
  }

  stopTimer();

  document.getElementById("memory-game").hidden = true;
  document.getElementById("game-finish").hidden = false;
  document.getElementById("game-toolbar").classList.add("hidden");

  document.getElementById("finish-time").textContent = formatTime(seconds);
  document.getElementById("finish-moves").textContent = moves;
}

function resetActiveGame() {
  if (activeGame === "process") {
    resetProcessGame();
    return;
  }

  if (activeGame === "ingredients") {
    resetRecipeGame();
    return;
  }

  resetGame();
}

function resetGame() {
  stopTimer();

  document.getElementById("memory-game").hidden = false;
  document.getElementById("game-finish").hidden = true;
  document.getElementById("game-toolbar").classList.remove("hidden");

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matches = 0;
  seconds = 0;

  movesEl.textContent = "0";
  matchesEl.textContent = "0";
  pairTotalEl.textContent = cardCount / 2;
  timerEl.textContent = "00:00";

  board.replaceChildren();

  const pairCount = cardCount / 2;
  const selectedItems = shuffle(cardItems).slice(0, pairCount);
  const deck = shuffle([...selectedItems, ...selectedItems]);

  board.style.setProperty("--columns", getColumnCount(cardCount));

  deck.forEach((item, index) => {
    board.appendChild(createCard(item, index));
  });
}

function getColumnCount(count) {
  if (count === 8) {
    return 4;
  }

  if (count === 32) {
    return 8;
  }

  return 4;
}

if (newGameButton) {
  newGameButton.addEventListener("click", resetGame);
}

if (playAgainButton) {
  playAgainButton.addEventListener("click", resetGame);
}

window.addEventListener("DOMContentLoaded", () => {
  if (typeof resetGame === "function") {
    resetGame();
  }
});
