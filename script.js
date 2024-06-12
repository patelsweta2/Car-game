let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let player = {
  speed: 5,
};

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
  let car = document.querySelector(".car");
  if (player.start) {
    if (keys.ArrowUp) {
      player.y = player.y - player.speed;
    }
    if (keys.ArrowDown) {
      player.y = player.y + player.speed;
    }
    if (keys.ArrowLeft) {
      player.x = player.x - player.speed;
    }
    if (keys.ArrowRight) {
      player.x = player.x + player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
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
  //lets make a car
  let car = document.createElement("div");
  car.innerHTML = "Car";
  car.className = "car";
  gameArea.append(car);
  //   console.log(car.offsetLeft, car.offsetTop);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  console.log(player);
}
