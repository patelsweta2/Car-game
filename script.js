let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let player = {};

startScreen.addEventListener("click", start);

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(event) {
  event.preventDefault();
  let pressedKey = event.key;
  if (
    pressedKey === "ArrowUp" ||
    pressedKey === "ArrowDown" ||
    pressedKey === "ArrowLeft" ||
    pressedKey === "ArrowRight"
  ) {
    keys[pressedKey] = true;
  }
  console.log(keys);
}

function keyRelease(event) {
  event.preventDefault();
  let releasedKey = event.key;
  if (
    releasedKey === "ArrowUp" ||
    releasedKey === "ArrowDown" ||
    releasedKey === "ArrowLeft" ||
    releasedKey === "ArrowRight"
  ) {
    keys[releasedKey] = true;
  }
  console.log(keys);
}

function gamePlay() {
  if (player.start) {
    requestAnimationFrame(gamePlay);
  }
}

function start() {
  console.log("clicked");
  //once clicked hide start screen and show game area
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;

  //end code of game player.start = false
  requestAnimationFrame(gamePlay);
}
