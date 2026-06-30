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

const processSteps = [
  {
    id: "prepare",
    title: "Priprav material",
    detail: "Vyber spravny kus ocele a nastroje.",
  },
  {
    id: "heat",
    title: "Rozohrej vo vyhni",
    detail: "Ocel musi byt dostatocne zohriata na kovanie.",
  },
  {
    id: "shape",
    title: "Tvaruj na nakovadline",
    detail: "Kladivom vytvor zakladny obluk podkovy.",
  },
  {
    id: "punch",
    title: "Vytvor otvory",
    detail: "Sekacom priprav miesta pre klince.",
  },
  {
    id: "quench",
    title: "Ochlad a skontroluj",
    detail: "Kus ochlad, skontroluj tvar a pevnost.",
  },
  {
    id: "finish",
    title: "Dobrus hrany",
    detail: "Pilnikom zacisti ostre casti a dokonc vyrobok.",
  },
];

const ingredientItems = [
  {
    id: "potatoes",
    label: "Zemiaky",
    symbol: "Ze",
    image: "assets/ingredients/potatoes.svg",
  },
  {
    id: "flour",
    label: "Muka",
    symbol: "Mu",
    image: "assets/ingredients/flour.svg",
  },
  {
    id: "egg",
    label: "Vajce",
    symbol: "Va",
    image: "assets/ingredients/egg.svg",
  },
  {
    id: "water",
    label: "Voda",
    symbol: "Vo",
    image: "assets/ingredients/water.svg",
  },
  {
    id: "salt",
    label: "Sol",
    symbol: "So",
    image: "assets/ingredients/salt.svg",
  },
  {
    id: "jam",
    label: "Lekvar",
    symbol: "Le",
    image: "assets/ingredients/jam.svg",
  },
  {
    id: "butter",
    label: "Maslo",
    symbol: "Ma",
    image: "assets/ingredients/butter.svg",
  },
  {
    id: "crumbs",
    label: "Struhanka",
    symbol: "St",
    image: "assets/ingredients/crumbs.svg",
  },
  {
    id: "sugar",
    label: "Cukor",
    symbol: "Cu",
    image: "assets/ingredients/sugar.svg",
  },
];

const ingredientRecipes = [
  {
    name: "Cesto na doske",
    seconds: 12,
    waitLabel: "Cesto sa valka a kraja",
    stage: "board",
    instruction:
      "Priprav cesto na doske. Po dokonceni sa vyvalka a nakraja nozom.",
    ingredients: ["potatoes", "flour", "egg", "salt"],
  },
  {
    name: "Plnenie periek",
    seconds: 10,
    waitLabel: "Do kazdeho kusu ide lekvar a okraje sa pritlacia",
    stage: "filled",
    instruction: "Na kazdy kus cesta daj lekvar, prehni ho a pritlac okraje.",
    ingredients: ["jam", "flour", "sugar"],
  },
  {
    name: "Varenie periek",
    seconds: 10,
    waitLabel: "Perky sa varia",
    stage: "boiling",
    instruction: "Daj perky do osolenej vody a nechaj ich varit.",
    ingredients: ["water", "salt", "potatoes"],
  },
  {
    name: "Vybratie z hrnca",
    seconds: 9,
    waitLabel: "Perky sa vyberaju na tanier",
    stage: "plate",
    instruction: "Vyber uvarene perky z hrnca a preloz ich na tanier.",
    ingredients: ["butter", "water", "salt"],
  },
  {
    name: "Posypanie",
    seconds: 14,
    waitLabel: "Perky sa posypu",
    stage: "finished",
    instruction: "Nakoniec ich omast, posyp struhankou a cukrom.",
    ingredients: ["butter", "crumbs", "sugar"],
  },
];

const board = document.querySelector("#game-board");
const movesEl = document.querySelector("#moves");
const matchesEl = document.querySelector("#matches");
const timerEl = document.querySelector("#timer");
const pairTotalEl = document.querySelector("#pair-total");
const newGameButton = document.querySelector("#new-game");
const playAgainButton = document.querySelector("#play-again");
const winDialog = document.querySelector("#win-dialog");
const dialogImageEl = document.querySelector("#dialog-image");
const dialogTitleEl = document.querySelector("#dialog-title");
const resultEl = document.querySelector("#result");
const sizeButtons = document.querySelectorAll(".size-option");
const gameTabs = document.querySelectorAll(".game-tab");
const memoryGame = document.querySelector("#memory-game");
const processGame = document.querySelector("#process-game");
const ingredientsGame = document.querySelector("#ingredients-game");
const processBank = document.querySelector("#process-bank");
const processList = document.querySelector("#process-list");
const processScoreEl = document.querySelector("#process-score");
const processFeedbackEl = document.querySelector("#process-feedback");
const checkProcessButton = document.querySelector("#check-process");
const resetProcessButton = document.querySelector("#reset-process");
const recipeRoundEl = document.querySelector("#recipe-round");
const recipeTimerEl = document.querySelector("#recipe-timer");
const recipeNameEl = document.querySelector("#recipe-name");
const recipeInstructionEl = document.querySelector("#recipe-instruction");
const recipeTargets = document.querySelector("#recipe-targets");
const timingFill = document.querySelector("#timing-fill");
const mixingBowl = document.querySelector("#mixing-bowl");
const bowlItems = document.querySelector("#bowl-items");
const bowlPlaceholder = document.querySelector("#bowl-placeholder");
const stageProduct = document.querySelector("#stage-product");
const stageLabelEl = document.querySelector("#stage-label");
const ingredientBank = document.querySelector("#ingredient-bank");
const startRecipeButton = document.querySelector("#start-recipe");
const resetRecipeButton = document.querySelector("#reset-recipe");
const recipeFeedbackEl = document.querySelector("#recipe-feedback");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let seconds = 0;
let timerId = null;
let cardCount = 16;
let activeGame = "memory";
let draggedStep = null;
let dragSource = null;
let pointerDraggedStep = null;
let pointerStart = null;
let pointerMoved = false;
let selectedStep = null;
let recipeRound = 0;
let recipeProgress = 0;
let recipeTimeLeft = ingredientRecipes[0].seconds;
let recipeTimerId = null;
let recipeWaitTimerId = null;
let recipeRunning = false;
let recipeWaiting = false;
let selectedIngredient = null;
let draggedIngredient = null;
let pointerDraggedIngredient = null;
let ingredientPointerStart = null;
let ingredientPointerMoved = false;
let ingredientDragGhost = null;

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
      <span class="card-back" aria-hidden="true">?</span>
      <span class="card-face">${cardFaceContent(item)}</span>
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
  hideDialogImage();
  dialogTitleEl.textContent = "Vyborne, vsetky dvojice su najdene.";
  resultEl.textContent = `Dokoncene za ${formatTime(seconds)} a ${moves} tahov.`;
  winDialog.showModal();
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
  hideDialogImage();
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
  deck.forEach((item, index) => board.appendChild(createCard(item, index)));

  if (winDialog.open) {
    winDialog.close();
  }
}

function switchGame(game) {
  activeGame = game;
  memoryGame.hidden = game !== "memory";
  processGame.hidden = game !== "process";
  ingredientsGame.hidden = game !== "ingredients";
  gameTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.game === game);
  });

  if (game === "process") {
    stopTimer();
    stopRecipeTimer();
    if (!processList.children.length) {
      resetProcessGame();
    }
    return;
  }

  if (game === "ingredients") {
    stopTimer();
    if (!ingredientBank.children.length) {
      resetRecipeGame();
    }
    return;
  }

  stopRecipeTimer();
  resetGame();
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

function createProcessSlot(step, index) {
  const slot = document.createElement("article");
  slot.className = "process-slot";
  slot.dataset.expectedStepId = step.id;
  slot.setAttribute("aria-label", `Okienko ${index + 1}`);

  slot.innerHTML = `
    <span class="slot-number">${index + 1}</span>
    <span class="slot-placeholder">Vloz krok procesu</span>
  `;

  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    slot.classList.add("is-hovered");
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("is-hovered");
  });

  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("is-hovered");
    placeStepInSlot(slot);
  });

  slot.addEventListener("click", () => {
    if (selectedStep) {
      placeStepInSlot(slot, selectedStep);
    }
  });

  return slot;
}

function createProcessItem(step) {
  const item = document.createElement("article");
  item.className = "process-item";
  item.draggable = false;
  item.dataset.stepId = step.id;
  item.setAttribute("aria-label", step.title);

  item.innerHTML = `
    <span class="drag-handle" aria-hidden="true">::</span>
    <span class="step-copy">
      <strong>${step.title}</strong>
      <span>${step.detail}</span>
    </span>
  `;

  item.addEventListener("click", () => {
    if (pointerMoved) {
      pointerMoved = false;
      return;
    }

    selectStep(item);
  });

  item.addEventListener("dragstart", (event) => {
    draggedStep = item;
    dragSource = item.parentElement;
    item.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", step.id);
  });

  item.addEventListener("dragend", () => {
    draggedStep = null;
    dragSource = null;
    item.classList.remove("is-dragging");
    updateProcessState(false);
  });

  item.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    dragSource = item.parentElement;
    pointerDraggedStep = item;
    pointerStart = { x: event.clientX, y: event.clientY };
    pointerMoved = false;
  });

  return item;
}

function handleProcessPointerMove(event) {
  if (!pointerDraggedStep || !pointerStart) {
    return;
  }

  const distance = Math.hypot(
    event.clientX - pointerStart.x,
    event.clientY - pointerStart.y,
  );
  if (distance > 8) {
    pointerMoved = true;
    pointerDraggedStep.classList.add("is-dragging");
  }
}

function handleProcessPointerUp(event) {
  if (!pointerDraggedStep) {
    return;
  }

  const item = pointerDraggedStep;
  const dropTarget = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest(".process-slot, .process-bank");

  item.classList.remove("is-dragging");
  if (pointerMoved && dropTarget?.classList.contains("process-slot")) {
    placeStepInSlot(dropTarget, item);
  } else if (pointerMoved && dropTarget?.classList.contains("process-bank")) {
    moveStepToBank(item);
  }

  pointerDraggedStep = null;
  dragSource = null;
  pointerStart = null;
  updateProcessState(false);
}

function resetProcessGame() {
  hideDialogImage();
  processFeedbackEl.textContent = "";
  selectedStep = null;
  processBank.replaceChildren();
  processList.replaceChildren();

  processSteps.forEach((step, index) => {
    processList.appendChild(createProcessSlot(step, index));
  });

  shuffle(processSteps).forEach((step) => {
    processBank.appendChild(createProcessItem(step));
  });

  updateProcessState(false);

  if (winDialog.open) {
    winDialog.close();
  }
}

function selectStep(item) {
  if (selectedStep === item) {
    item.classList.remove("is-selected");
    selectedStep = null;
    return;
  }

  document.querySelectorAll(".process-item.is-selected").forEach((step) => {
    step.classList.remove("is-selected");
  });
  selectedStep = item;
  item.classList.add("is-selected");
}

function placeStepInSlot(slot, item = draggedStep) {
  if (!item) {
    return;
  }

  const currentItem = slot.querySelector(".process-item");
  const source = dragSource || item.parentElement;

  if (currentItem && currentItem !== item) {
    if (source?.classList.contains("process-slot")) {
      source.appendChild(currentItem);
    } else {
      processBank.appendChild(currentItem);
    }
  }

  slot.appendChild(item);
  item.classList.remove("is-selected", "is-dragging");
  selectedStep = null;
  updateProcessState(false);
}

function moveStepToBank(item = draggedStep) {
  if (!item) {
    return;
  }

  processBank.appendChild(item);
  item.classList.remove("is-selected", "is-dragging");
  selectedStep = null;
  updateProcessState(false);
}

function updateProcessState(showFeedback) {
  const slots = [...processList.children];
  let correct = 0;

  slots.forEach((slot) => {
    const item = slot.querySelector(".process-item");
    const isFilled = Boolean(item);
    const isCorrect = item?.dataset.stepId === slot.dataset.expectedStepId;
    if (isCorrect) {
      correct += 1;
    }

    slot.classList.toggle("is-filled", isFilled);
    slot.classList.toggle("is-correct", showFeedback && isCorrect);
    slot.classList.toggle("is-wrong", showFeedback && isFilled && !isCorrect);
  });

  processScoreEl.textContent = `${correct}/${processSteps.length}`;
  return correct;
}

function checkProcessOrder() {
  const correct = updateProcessState(true);

  if (correct === processSteps.length) {
    hideDialogImage();
    dialogTitleEl.textContent = "Proces je spravne zoradeny.";
    resultEl.textContent = "Z ocele je hotova kovana podkova.";
    winDialog.showModal();
    processFeedbackEl.textContent = "";
    return;
  }

  processFeedbackEl.textContent = `Spravne je ${correct} z ${processSteps.length} krokov. Vloz kroky do spravnych okienok.`;
}

function showDialogImage(src, alt) {
  dialogImageEl.src = src;
  dialogImageEl.alt = alt;
  dialogImageEl.hidden = false;
  winDialog.classList.add("is-finale");
}

function hideDialogImage() {
  winDialog.classList.remove("is-finale");
  dialogImageEl.hidden = true;
  dialogImageEl.removeAttribute("src");
  dialogImageEl.alt = "";
}

function getIngredient(id) {
  return ingredientItems.find((item) => item.id === id);
}

function stopRecipeTimer() {
  window.clearInterval(recipeTimerId);
  recipeTimerId = null;
}

function stopRecipeWaitTimer() {
  window.clearInterval(recipeWaitTimerId);
  recipeWaitTimerId = null;
}

function setRecipeStage(stage, label = "") {
  ingredientsGame.classList.remove(
    "stage-board-active",
    "stage-filled-active",
    "stage-boiling-active",
    "stage-plate-active",
    "stage-finished-active",
  );
  ingredientsGame.classList.add(`stage-${stage}-active`);
  stageProduct.className = `stage-product stage-${stage}`;
  stageLabelEl.textContent = label;
}

function updateRecipeTimerDisplay() {
  const recipe = ingredientRecipes[recipeRound];
  const ratio = Math.max(recipeTimeLeft, 0) / recipe.seconds;
  recipeTimerEl.textContent = recipeTimeLeft.toFixed(1);
  timingFill.style.transform = `scaleX(${ratio})`;
  timingFill.classList.toggle("is-low", ratio <= 0.35);
}

function createTargetChip(ingredientId, index) {
  const ingredient = getIngredient(ingredientId);
  const chip = document.createElement("span");
  chip.className = "recipe-target";
  chip.dataset.ingredientId = ingredientId;
  chip.innerHTML = `
    <span>${index + 1}</span>
    <img src="${ingredient.image}" alt="" aria-hidden="true" />
    <strong>${ingredient.label}</strong>
  `;
  return chip;
}

function createIngredientItem(ingredient) {
  const item = document.createElement("button");
  item.className = "ingredient-item";
  item.type = "button";
  item.draggable = true;
  item.dataset.ingredientId = ingredient.id;
  item.setAttribute("aria-label", ingredient.label);
  item.innerHTML = `
    <img class="ingredient-image" src="${ingredient.image}" alt="" aria-hidden="true" />
    <strong>${ingredient.label}</strong>
  `;

  item.addEventListener("click", () => {
    if (ingredientPointerMoved) {
      ingredientPointerMoved = false;
      return;
    }

    selectIngredient(item);
  });

  item.addEventListener("dragstart", (event) => {
    draggedIngredient = item;
    item.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", ingredient.id);
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("is-dragging");
    draggedIngredient = null;
  });

  item.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    pointerDraggedIngredient = item;
    ingredientPointerStart = { x: event.clientX, y: event.clientY };
    ingredientPointerMoved = false;
  });

  return item;
}

function createIngredientDragGhost(item, x, y) {
  removeIngredientDragGhost();
  ingredientDragGhost = item.cloneNode(true);
  ingredientDragGhost.classList.remove("is-selected", "is-wrong");
  ingredientDragGhost.classList.add("ingredient-drag-ghost");
  ingredientDragGhost.setAttribute("aria-hidden", "true");
  ingredientDragGhost.removeAttribute("id");
  document.body.appendChild(ingredientDragGhost);
  moveIngredientDragGhost(x, y);
}

function moveIngredientDragGhost(x, y) {
  if (!ingredientDragGhost) {
    return;
  }

  ingredientDragGhost.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -62%) rotate(3deg) scale(1.08)`;
}

function removeIngredientDragGhost() {
  ingredientDragGhost?.remove();
  ingredientDragGhost = null;
}

function renderRecipe() {
  const recipe = ingredientRecipes[recipeRound];
  recipeProgress = 0;
  recipeTimeLeft = recipe.seconds;
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  setRecipeStage(recipe.stage, "");
  recipeNameEl.textContent = recipe.name;
  recipeInstructionEl.textContent = recipe.instruction;
  recipeRoundEl.textContent = `${recipeRound + 1}/${ingredientRecipes.length}`;
  recipeTargets.replaceChildren();
  bowlItems.replaceChildren();
  recipe.ingredients.forEach((ingredientId, index) => {
    recipeTargets.appendChild(createTargetChip(ingredientId, index));
  });
  updateBowlState();
  updateRecipeTimerDisplay();
}

function resetRecipeGame() {
  stopRecipeTimer();
  stopRecipeWaitTimer();
  hideDialogImage();
  recipeRound = 0;
  recipeRunning = false;
  recipeWaiting = false;
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  selectedIngredient = null;
  draggedIngredient = null;
  pointerDraggedIngredient = null;
  removeIngredientDragGhost();
  recipeFeedbackEl.textContent =
    "Stlac Start a potom presuvaj suroviny do misy.";
  startRecipeButton.textContent = "Start";
  startRecipeButton.disabled = false;
  ingredientBank.replaceChildren();
  shuffle(ingredientItems).forEach((ingredient) => {
    ingredientBank.appendChild(createIngredientItem(ingredient));
  });
  renderRecipe();

  if (winDialog.open) {
    winDialog.close();
  }
}

function startRecipeGame() {
  if (recipeRunning || recipeWaiting) {
    return;
  }

  if (recipeRound >= ingredientRecipes.length) {
    resetRecipeGame();
  }

  recipeRunning = true;
  recipeWaiting = false;
  ingredientsGame.classList.add("is-cooking");
  ingredientsGame.classList.remove("is-waiting");
  setRecipeStage(ingredientRecipes[recipeRound].stage, "");
  startRecipeButton.textContent = "-";
  startRecipeButton.disabled = true;
  recipeFeedbackEl.textContent = "Čas beží. Traf spravne poradie.";
  stopRecipeTimer();
  recipeTimerId = window.setInterval(() => {
    recipeTimeLeft = Math.max(0, recipeTimeLeft - 0.1);
    updateRecipeTimerDisplay();

    if (recipeTimeLeft <= 0) {
      failRecipeRound();
    }
  }, 100);
}

function selectIngredient(item) {
  if (recipeWaiting) {
    recipeFeedbackEl.textContent = "Teraz sa pripravuje medzikrok v hrnci.";
    return;
  }

  if (!recipeRunning) {
    recipeFeedbackEl.textContent = "Najprv spusti kolo tlacidlom Start.";
    return;
  }

  if (selectedIngredient === item) {
    item.classList.remove("is-selected");
    selectedIngredient = null;
    return;
  }

  document
    .querySelectorAll(".ingredient-item.is-selected")
    .forEach((ingredient) => {
      ingredient.classList.remove("is-selected");
    });
  selectedIngredient = item;
  item.classList.add("is-selected");
}

function addIngredientToBowl(item = draggedIngredient) {
  if (!item) {
    return;
  }

  if (recipeWaiting) {
    recipeFeedbackEl.textContent = "Pockaj, teraz bezi varenie v hrnci.";
    return;
  }

  if (!recipeRunning) {
    recipeFeedbackEl.textContent = "Najprv spusti kolo tlacidlom Start.";
    return;
  }

  const recipe = ingredientRecipes[recipeRound];
  const expectedIngredientId = recipe.ingredients[recipeProgress];
  const ingredientId = item.dataset.ingredientId;
  const ingredient = getIngredient(ingredientId);

  if (ingredientId !== expectedIngredientId) {
    recipeTimeLeft = Math.max(0, recipeTimeLeft - 2);
    recipeFeedbackEl.textContent = `${ingredient.label} teraz nepatri do misy. Stracas 2 sekundy.`;
    updateRecipeTimerDisplay();
    item.classList.add("is-wrong");
    window.setTimeout(() => item.classList.remove("is-wrong"), 280);
    if (recipeTimeLeft <= 0) {
      failRecipeRound();
    }
    return;
  }

  const bowlChip = document.createElement("span");
  bowlChip.className = "bowl-chip";
  bowlChip.innerHTML = `
    <img src="${ingredient.image}" alt="" aria-hidden="true" />
    <span>${ingredient.label}</span>
  `;
  bowlItems.appendChild(bowlChip);
  bowlChip.addEventListener(
    "animationend",
    () => {
      bowlChip.classList.add("is-settled");
    },
    { once: true },
  );
  mixingBowl.classList.remove("has-drop-pop");
  void mixingBowl.offsetWidth;
  mixingBowl.classList.add("has-drop-pop");
  window.setTimeout(() => mixingBowl.classList.remove("has-drop-pop"), 340);
  recipeTargets.children[recipeProgress].classList.add("is-done");
  recipeProgress += 1;
  recipeFeedbackEl.textContent = "Spravne.";
  item.classList.remove("is-selected", "is-dragging");
  selectedIngredient = null;
  updateBowlState();

  if (recipeProgress === recipe.ingredients.length) {
    completeRecipeRound();
  }
}

function updateBowlState() {
  bowlPlaceholder.hidden = bowlItems.children.length > 0;
}

function completeRecipeRound() {
  stopRecipeTimer();
  recipeRunning = false;
  startRecipeWait();
}

function finishRecipeGame() {
  recipeFeedbackEl.textContent = "";
  startRecipeButton.textContent = "Hotovo";
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  setRecipeStage("finished", "");
  showDialogImage(
    "assets/ingredients/perky-plate.svg",
    "Hotove slovenske perky na tanieri",
  );
  dialogTitleEl.textContent = "Perky su hotove.";
  resultEl.textContent =
    "Stihol si pripravit cesto, naplnit perky, uvarit ich, vybrat na tanier a posypat.";
  winDialog.showModal();
}

function startRecipeWait() {
  const recipe = ingredientRecipes[recipeRound];
  let waitLeft = 5;
  recipeWaiting = true;
  ingredientsGame.classList.add("is-cooking", "is-waiting");
  setRecipeStage(recipe.stage, recipe.waitLabel);
  startRecipeButton.textContent = "Varí sa";
  startRecipeButton.disabled = true;
  recipeFeedbackEl.textContent = `${recipe.waitLabel}... ${waitLeft}`;
  recipeTimerEl.textContent = waitLeft.toFixed(0);
  timingFill.classList.remove("is-low");
  timingFill.style.transform = "scaleX(1)";
  stopRecipeWaitTimer();
  recipeWaitTimerId = window.setInterval(() => {
    waitLeft -= 1;
    recipeTimerEl.textContent = waitLeft.toFixed(0);
    timingFill.style.transform = `scaleX(${waitLeft / 5})`;
    recipeFeedbackEl.textContent = `${recipe.waitLabel}... ${waitLeft}`;

    if (waitLeft <= 0) {
      stopRecipeWaitTimer();
      recipeWaiting = false;
      ingredientsGame.classList.remove("is-waiting");
      if (recipeRound === ingredientRecipes.length - 1) {
        finishRecipeGame();
        return;
      }

      recipeRound += 1;
      renderRecipe();
      recipeFeedbackEl.textContent = "Dalsia uroven sa spustila.";
      startRecipeGame();
    }
  }, 1000);
}

function failRecipeRound() {
  stopRecipeTimer();
  stopRecipeWaitTimer();
  recipeRunning = false;
  recipeWaiting = false;
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  recipeTimeLeft = 0;
  updateRecipeTimerDisplay();
  startRecipeButton.textContent = "Skusit znova";
  startRecipeButton.disabled = false;
  recipeFeedbackEl.textContent =
    "Cas vyprsal. Resetni recept alebo skus znovu od zaciatku.";
  recipeRound = 0;
  renderRecipe();
}

function handleIngredientPointerMove(event) {
  if (!pointerDraggedIngredient || !ingredientPointerStart) {
    return;
  }

  const distance = Math.hypot(
    event.clientX - ingredientPointerStart.x,
    event.clientY - ingredientPointerStart.y,
  );
  if (distance > 8) {
    event.preventDefault();
    ingredientPointerMoved = true;
    pointerDraggedIngredient.classList.add("is-dragging");
    if (!ingredientDragGhost) {
      createIngredientDragGhost(
        pointerDraggedIngredient,
        event.clientX,
        event.clientY,
      );
    } else {
      moveIngredientDragGhost(event.clientX, event.clientY);
    }
  }
}

function handleIngredientPointerUp(event) {
  if (!pointerDraggedIngredient) {
    return;
  }

  const item = pointerDraggedIngredient;
  const dropTarget = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest("#mixing-bowl");
  item.classList.remove("is-dragging");
  removeIngredientDragGhost();
  if (ingredientPointerMoved && dropTarget) {
    addIngredientToBowl(item);
  }

  pointerDraggedIngredient = null;
  ingredientPointerStart = null;
  ingredientPointerMoved = false;
}

newGameButton.addEventListener("click", resetActiveGame);
playAgainButton.addEventListener("click", resetActiveGame);
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cardCount = Number(button.dataset.cardCount);
    sizeButtons.forEach((option) => option.classList.remove("is-active"));
    button.classList.add("is-active");
    resetGame();
  });
});
gameTabs.forEach((button) => {
  button.addEventListener("click", () => switchGame(button.dataset.game));
});
checkProcessButton.addEventListener("click", checkProcessOrder);
resetProcessButton.addEventListener("click", resetProcessGame);
processBank.addEventListener("dragover", (event) => {
  event.preventDefault();
});
processBank.addEventListener("drop", (event) => {
  event.preventDefault();
  moveStepToBank();
});
startRecipeButton.addEventListener("click", startRecipeGame);
resetRecipeButton.addEventListener("click", resetRecipeGame);
mixingBowl.addEventListener("dragover", (event) => {
  event.preventDefault();
  mixingBowl.classList.add("is-hovered");
});
mixingBowl.addEventListener("dragleave", () => {
  mixingBowl.classList.remove("is-hovered");
});
mixingBowl.addEventListener("drop", (event) => {
  event.preventDefault();
  mixingBowl.classList.remove("is-hovered");
  addIngredientToBowl();
});
mixingBowl.addEventListener("click", () => {
  if (selectedIngredient) {
    addIngredientToBowl(selectedIngredient);
  }
});
document.addEventListener("pointermove", handleProcessPointerMove);
document.addEventListener("pointermove", handleIngredientPointerMove);
document.addEventListener("pointerup", handleProcessPointerUp);
document.addEventListener("pointerup", handleIngredientPointerUp);

resetGame();
resetRecipeGame();
