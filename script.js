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
  score: 0,
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
  //   console.log(keys);
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
    keys[releasedKey] = false;
  }
  //   console.log(keys);
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  moveLines();
  moveEnemies(car);
  //   console.log(road);
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y = player.y - player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 125) {
      player.y = player.y + player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 60) {
      player.x = player.x + player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    window.requestAnimationFrame(gamePlay);

    player.score++;
    score.innerText = "Score: " + player.score;
  }
}

function moveLines() {
  const dividers = document.querySelectorAll(".divider");
  dividers.forEach((divider) => {
    // console.log("y", divider.y);
    if (divider.y >= 1200) {
      divider.y = divider.y - 1200;
    }
    divider.y = divider.y + player.speed;
    divider.style.top = divider.y + "px";
  });
}

function moveEnemies(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    if (isCollide(car, enemy)) {
      console.log("Boom! hit");
      endGame();
    }

    if (enemy.y >= 1000) {
      enemy.y = enemy.y - 2000;
      enemy.style.left = parseInt(Math.random() * 250) + "px";
      enemy.style.backgroundColor = randomColor();
    }
    enemy.y = enemy.y + player.speed;
    enemy.style.top = enemy.y + "px";
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  let collideCondition =
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right;
  return !collideCondition;
}

function endGame() {
  player.start = false;
  startScreen.innerHTML =
    "Game Over <br> Your final score is " +
    player.score +
    "<br>Click here to restart the game";

  startScreen.classList.remove("hide");
  //   startScreen.addEventListener("click", start, { once: true });
}

function start() {
  //   console.log("clicked");
  //once clicked hide start screen and show game area
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;

  // lets make a divider:
  for (let x = 0; x < 10; x++) {
    let divider = document.createElement("div");
    divider.className = "divider";
    divider.y = x * 150;
    divider.style.top = divider.y + "px";
    gameArea.append(divider);
  }

  //end code of game player.start = false
  window.requestAnimationFrame(gamePlay);
  //lets make a car
  let car = document.createElement("div");
  //   car.innerHTML = "Car";
  car.className = "car";
  gameArea.append(car);
  //   console.log(car.offsetLeft, car.offsetTop);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  // enemyCar car
  for (let i = 0; i <= 3; i++) {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.y = (i + 1) * 600 * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = parseInt(Math.random() * 350) + "px";
    enemy.style.backgroundColor = randomColor();
    gameArea.append(enemy);
  }
}

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}
