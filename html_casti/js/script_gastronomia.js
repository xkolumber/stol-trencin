const ingredientItems = [
  {
    id: "potatoes",
    label: "Zemiaky",
    image: "assets/ingredients/potatoes.svg",
  },
  { id: "flour", label: "Múka", image: "assets/ingredients/flour.svg" },
  { id: "egg", label: "Vajce", image: "assets/ingredients/egg.svg" },
  { id: "water", label: "Voda", image: "assets/ingredients/water.svg" },
  { id: "salt", label: "Soľ", image: "assets/ingredients/salt.svg" },
  { id: "jam", label: "Lekvár", image: "assets/ingredients/jam.svg" },
  { id: "butter", label: "Maslo", image: "assets/ingredients/butter.svg" },
  {
    id: "crumbs",
    label: "Strúhanka",
    image: "assets/ingredients/crumbs.svg",
  },
  { id: "sugar", label: "Cukor", image: "assets/ingredients/sugar.svg" },
];
const ingredientRecipes = [
  {
    name: "Cesto na doske",
    seconds: 12,
    waitLabel: "Cesto sa vaľká a krája",
    stage: "board",
    instruction:
      "Priprav cesto na doske. Po dokončení ho vyvaľkaj a nakrájaj nožom.",
    ingredients: ["potatoes", "flour", "egg", "salt"],
  },
  {
    name: "Plnenie periek",
    seconds: 10,
    waitLabel: "Perky sa plnia lekvárom a okraje sa pritláčajú",
    stage: "filled",
    instruction: "Na každý kúsok cesta daj lekvár, prelož ho a pritlač okraje.",
    ingredients: ["jam", "flour", "sugar"],
  },
  {
    name: "Varenie periek",
    seconds: 10,
    waitLabel: "Perky sa varia",
    stage: "boiling",
    instruction: "Vlož perky do osolenej vody a nechaj ich variť.",
    ingredients: ["water", "salt", "potatoes"],
  },
  {
    name: "Vyberanie z hrnca",
    seconds: 9,
    waitLabel: "Perky sa vyberajú z hrnca",
    stage: "plate",
    instruction: "Vyber uvarené perky z hrnca a prelož ich na tanier.",
    ingredients: ["butter", "water", "salt"],
  },
  {
    name: "Posypanie",
    seconds: 14,
    waitLabel: "Perky sa omastia a posypú",
    stage: "finished",
    instruction: "Nakoniec ich omaž maslom a posyp strúhankou a cukrom.",
    ingredients: ["butter", "crumbs", "sugar"],
  },
];

const winDialog = document.querySelector("#recipe-finished");
const dialogImageEl = document.querySelector("#dialog-image");
const dialogTitleEl = document.querySelector("#dialog-title");
const resultEl = document.querySelector("#result");

const ingredientsGame = document.querySelector("#ingredients-game");
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

// 3. Stavové premenné hry
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

// 4. Pomocné funkcie
function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
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

function showDialogImage(src, alt) {
  dialogImageEl.src = src;
  dialogImageEl.alt = alt;
  // Skryjeme hrací panel a ukážeme panel výhry
  ingredientsGame.classList.add("hidden");
  winDialog.classList.remove("hidden");
}

function hideDialogImage() {
  // Ukážeme hrací panel naspäť a skryjeme výhru
  winDialog.classList.add("hidden");
  ingredientsGame.classList.remove("hidden");
  dialogImageEl.removeAttribute("src");
  dialogImageEl.alt = "";
}

// function showDialogImage(src, alt) {
//   dialogImageEl.src = src;
//   dialogImageEl.alt = alt;
//   dialogImageEl.hidden = false;
//   winDialog.classList.add("is-finale");
// }

// function hideDialogImage() {
//   winDialog.classList.remove("is-finale");
//   dialogImageEl.hidden = true;
//   dialogImageEl.removeAttribute("src");
//   dialogImageEl.alt = "";
// }

// 5. Logika vizuálnych fáz receptu
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

function updateBowlState() {
  bowlPlaceholder.hidden = bowlItems.children.length > 0;
}

// 6. Generovanie HTML prvkov pre hru
function createTargetChip(ingredientId, index) {
  const ingredient = getIngredient(ingredientId);
  const chip = document.createElement("span");
  chip.className = "recipe-target";
  chip.dataset.ingredientId = ingredientId;
  chip.innerHTML = `
    <span>${index + 1}</span>
    <strong>${ingredient.label}</strong>
    <img src="${ingredient.image}" alt="" aria-hidden="true" />
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
    if (event.button !== 0) return;
    pointerDraggedIngredient = item;
    ingredientPointerStart = { x: event.clientX, y: event.clientY };
    ingredientPointerMoved = false;
  });

  return item;
}

// 7. Správa "Ghost" elementu pre mobilný / Pointer drag
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
  if (!ingredientDragGhost) return;
  ingredientDragGhost.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -62%) rotate(3deg) scale(1.08)`;
}

function removeIngredientDragGhost() {
  ingredientDragGhost?.remove();
  ingredientDragGhost = null;
}

// 8. Hlavné riadenie stavu minihry
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
  hideDialogImage(); // Toto zabezpečí, že sa znova ukáže čistá hra

  recipeRound = 0;
  recipeRunning = false;
  recipeWaiting = false;
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  selectedIngredient = null;
  draggedIngredient = null;
  pointerDraggedIngredient = null;
  removeIngredientDragGhost();

  recipeFeedbackEl.textContent =
    "Stlač Štart a potom presúvaj suroviny do misy.";
  startRecipeButton.textContent = "Štart";
  startRecipeButton.disabled = false;

  ingredientBank.replaceChildren();
  shuffle(ingredientItems).forEach((ingredient) => {
    ingredientBank.appendChild(createIngredientItem(ingredient));
  });

  renderRecipe();
}

// function resetRecipeGame() {
//   stopRecipeTimer();
//   stopRecipeWaitTimer();
//   hideDialogImage();
//   recipeRound = 0;
//   recipeRunning = false;
//   recipeWaiting = false;
//   ingredientsGame.classList.remove("is-cooking", "is-waiting");
//   selectedIngredient = null;
//   draggedIngredient = null;
//   pointerDraggedIngredient = null;
//   removeIngredientDragGhost();

//   recipeFeedbackEl.textContent =
//     "Stlač Štart a potom presúvaj suroviny do misy.";
//   startRecipeButton.textContent = "Štart";
//   startRecipeButton.disabled = false;

//   ingredientBank.replaceChildren();
//   shuffle(ingredientItems).forEach((ingredient) => {
//     ingredientBank.appendChild(createIngredientItem(ingredient));
//   });

//   renderRecipe();

//   if (winDialog.open) {
//     winDialog.close();
//   }
// }

function startRecipeGame() {
  if (recipeRunning || recipeWaiting) return;

  if (recipeRound >= ingredientRecipes.length) {
    resetRecipeGame();
  }

  recipeRunning = true;
  recipeWaiting = false;
  ingredientsGame.classList.add("is-cooking");
  ingredientsGame.classList.remove("is-waiting");
  setRecipeStage(ingredientRecipes[recipeRound].stage, "");
  startRecipeButton.textContent = "Beží ti čas";
  startRecipeButton.disabled = true;
  recipeFeedbackEl.textContent =
    "Čas beži. Poukladaj suroviny v správnom poradí.";

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
    recipeFeedbackEl.textContent = "Najprv spusti kolo tlačidlom Štart.";
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
  if (!item) return;

  if (recipeWaiting) {
    recipeFeedbackEl.textContent = "Pockaj, teraz bezi varenie v hrnci.";
    return;
  }
  if (!recipeRunning) {
    recipeFeedbackEl.textContent = "Najprv spusti kolo tlačidlom Štart.";
    return;
  }

  const recipe = ingredientRecipes[recipeRound];
  const expectedIngredientId = recipe.ingredients[recipeProgress];
  const ingredientId = item.dataset.ingredientId;
  const ingredient = getIngredient(ingredientId);

  if (ingredientId !== expectedIngredientId) {
    recipeTimeLeft = Math.max(0, recipeTimeLeft - 2);
    recipeFeedbackEl.textContent = `${ingredient.label} teraz nepatrí do misy. Strácaš 2 sekundy.`;
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

  // Animácia misy (pop efekt)
  mixingBowl.classList.remove("has-drop-pop");
  void mixingBowl.offsetWidth;
  mixingBowl.classList.add("has-drop-pop");
  window.setTimeout(() => mixingBowl.classList.remove("has-drop-pop"), 340);

  recipeTargets.children[recipeProgress].classList.add("is-done");
  recipeProgress += 1;
  recipeFeedbackEl.textContent = "Správne.";
  item.classList.remove("is-selected", "is-dragging");
  selectedIngredient = null;
  updateBowlState();

  if (recipeProgress === recipe.ingredients.length) {
    completeRecipeRound();
  }
}

function completeRecipeRound() {
  stopRecipeTimer();
  recipeRunning = false;
  startRecipeWait();
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
  startRecipeButton.textContent = "Skusiť znova";
  startRecipeButton.disabled = false;
  recipeFeedbackEl.textContent =
    "Čas vypršal. Resetni recept a skús ho vyskladať od začiatku.";
  recipeRound = 0;
  renderRecipe();
}

function finishRecipeGame() {
  recipeFeedbackEl.textContent = "";
  startRecipeButton.textContent = "Hotovo";
  ingredientsGame.classList.remove("is-cooking", "is-waiting");
  setRecipeStage("finished", "");

  // Spustí prepnutie kariet (skryje hru, ukáže info)
  showDialogImage(
    "../images/gastronomia/perky.png",
    "Hotove slovenske perky na tanieri",
  );

  dialogTitleEl.textContent = "Perfektné!";
  resultEl.textContent = "Už vieš pripraviť perky ako pravý šéfkuchár!";
}

// function finishRecipeGame() {
//   recipeFeedbackEl.textContent = "";
//   startRecipeButton.textContent = "Hotovo";
//   ingredientsGame.classList.remove("is-cooking", "is-waiting");
//   setRecipeStage("finished", "");

//   showDialogImage(
//     "assets/ingredients/perky-plate.svg",
//     "Hotove slovenske perky na tanieri",
//   );
//   dialogTitleEl.textContent = "Perky su hotove.";
//   resultEl.textContent =
//     "Stihol si pripravit cesto, naplnit perky, uvarit ich, vybrat na tanier a posypat.";
//   winDialog.showModal();
// }

// 9. Pointer Event Handlery (Drag & Drop podpora pre dotyk a myš)
function handleIngredientPointerMove(event) {
  if (!pointerDraggedIngredient || !ingredientPointerStart) return;

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
  if (!pointerDraggedIngredient) return;

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

// 10. Event Listeners (Priradenie udalostí pre UI komponenty)
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

// Globálne sledovanie pohybu pre simuláciu ťahania elementov
document.addEventListener("pointermove", handleIngredientPointerMove);
document.addEventListener("pointerup", handleIngredientPointerUp);

// Inicializácia hry pri načítaní súboru
resetRecipeGame();

document
  .querySelector("#play-again")
  .addEventListener("click", resetRecipeGame);
