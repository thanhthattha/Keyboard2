// Constants
const body = document.getElementsByTagName("body")[0],
  domElements = document.querySelectorAll("body > *"),
  gif = document.getElementById("gif"),
  keyboard = document.getElementsByClassName("keyboard")[0],
  keys = [
    "Escape",
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backslash",
    "Delete",
    "Home",
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backspace",
    "PageUp",
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Enter",
    "PageDown",
    "ShiftLeft",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ShiftRight",
    "ArrowUp",
    "End",
    "ControlLeft",
    "MetaLeft",
    "AltLeft",
    "Space",
    "AltRight",
    "ContextMenu",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
  ],
  konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA", "Enter"];

// Variables
let buffer = [];

// Functions
function checkForKonamiCode(pushToBuffer) {
  buffer.push(pushToBuffer);

  const stringifiedBuffer = buffer.slice(-11).toString(),
    stringifiedKonamiCode = konamiCode.toString();

  if (stringifiedBuffer === stringifiedKonamiCode) {
    gif.classList.toggle("gif--hidden");
  }
}

function scaleElements(container, elements) {
  elements.forEach((element) => {
    const scale = Math.min(container.offsetWidth / element.offsetWidth, container.offsetHeight / element.offsetHeight);
    if (scale <= 1 && scale > 0) element.style.transform = `scale(${scale - 0.1})`;
  });
}

// Digital keyboard sync
keys.forEach((key, index) => {
  document.getElementById(keys[index]).addEventListener("click", function (event) {
    checkForKonamiCode(event.toElement.id);
  });
});

window.addEventListener("keydown", ({ code }) => {
  if (keys.includes(code)) {
    document.getElementById(code).classList.add("active");
    checkForKonamiCode(code);
  }
});

window.addEventListener("keyup", ({ code }) => {
  if (keys.includes(code)) {
    document.getElementById(code).classList.remove("active");
  }
});

// Responsive scaling
scaleElements(body, domElements);
window.addEventListener("resize", () => {
  scaleElements(body, domElements);
});

function playSound() {
  const audio = new Audio("./sound.mp3");
  audio.play();
}

const touched = document.querySelector("#touched");
touched.onclick = () => {
  playSound();
};
