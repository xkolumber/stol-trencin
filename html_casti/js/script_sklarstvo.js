const processSteps = [
  {
    id: "suroviny",
    title: "Suroviny",
    detail: "Kremeň, voda a ďalšie prímesi pripravené na výrobu skla.",
  },
  {
    id: "tavenie",
    title: "Tavenie", // Tu je opravený ten preklep "Tavenic"
    detail:
      "Suroviny sa v peci zahrejú na veľmi vysokú teplotu a premenia sa na roztavenú sklovinu.",
  },
  {
    id: "nabranie",
    title: "Nabranie skla",
    detail: "Sklár naberie horúcu sklovinu na sklársku píšťalu.",
  },
  {
    id: "tvarovanie",
    title: "Fúkanie a tvarovanie",
    detail: "Pomocou dychu a nástrojov vytvorí požadovaný tvar výrobku.",
  },
  {
    id: "chladenie",
    title: "Chladenie",
    detail: "Hotový výrobok sa pomaly ochladzuje, aby nepraskol.",
  },
  {
    id: "vyrobok",
    title: "Hotový výrobok",
    detail: "Pohár, váza alebo iný sklenený predmet je pripravený na použitie.",
  },
];
const processBank = document.querySelector("#process-bank");
const processList = document.querySelector("#process-list");
const processScoreEl = document.querySelector("#process-score");
const processFeedbackEl = document.querySelector("#process-feedback");
const checkProcessButton = document.querySelector("#check-process");
const resetProcessButton = document.querySelector("#reset-process");

// Ak vo svojom HTML nemáš win-dialog (v tvojom výstrižku chýba),
// tieto riadky využívajú zabudovaný alert/fallback, ak dialog neexistuje.
const winDialog = document.querySelector("#win-dialog");
const resultEl = document.querySelector("#result");
const dialogTitleEl = document.querySelector("#dialog-title");

let draggedStep = null;
let dragSource = null;
let pointerDraggedStep = null;
let pointerStart = null;
let pointerMoved = false;
let selectedStep = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createProcessSlot(step, index) {
  const slot = document.createElement("article");
  slot.className = "process-slot";
  slot.dataset.expectedStepId = step.id;
  slot.setAttribute("aria-label", `Okienko ${index + 1}`);

  slot.innerHTML = `
    <span class="slot-number">${index + 1}</span>
    <span class="slot-placeholder">Tu potiahni krok</span>
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
  item.draggable = true;
  item.dataset.stepId = step.id;
  item.setAttribute("aria-label", step.title);

  item.innerHTML = `
    <img src="assets/images/six_points.svg" class="drag-handle" alt="Pretiahnuť" aria-hidden="true" />
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
    if (event.button !== 0) return;
    dragSource = item.parentElement;
    pointerDraggedStep = item;
    pointerStart = { x: event.clientX, y: event.clientY };
    pointerMoved = false;
  });

  return item;
}

function handleProcessPointerMove(event) {
  if (!pointerDraggedStep || !pointerStart) return;

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
  if (!pointerDraggedStep) return;

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
  const gamePanel = document.querySelector("#process-game");
  const successPanel = document.querySelector("#process-success");
  if (gamePanel && successPanel) {
    gamePanel.classList.remove("hidden");
    successPanel.classList.add("hidden");
  }
  // --------------------------------------------

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

  if (winDialog && winDialog.open) {
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
  if (!item) return;

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
  if (!item) return;

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
    const gamePanel = document.querySelector("#process-game");
    const successPanel = document.querySelector("#process-success");

    if (gamePanel && successPanel) {
      gamePanel.classList.add("hidden");
      successPanel.classList.remove("hidden");
    }

    processFeedbackEl.textContent = "";
    return;
  }

  processFeedbackEl.textContent = `Správnych je ${correct} z ${processSteps.length} krokov. Vlož kroky do správnych okienok.`;
}
checkProcessButton.addEventListener("click", checkProcessOrder);
resetProcessButton.addEventListener("click", resetProcessGame);

processBank.addEventListener("dragover", (event) => {
  event.preventDefault();
});

processBank.addEventListener("drop", (event) => {
  event.preventDefault();
  moveStepToBank();
});

document.addEventListener("pointermove", handleProcessPointerMove);
document.addEventListener("pointerup", handleProcessPointerUp);

document
  .querySelector("#retry-process")
  ?.addEventListener("click", resetProcessGame);

resetProcessGame();

document
  .querySelector("#retry-process")
  ?.addEventListener("click", resetProcessGame);
