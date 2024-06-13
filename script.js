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
    keys[releasedKey] = false;
  }
  console.log(keys);
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  moveLines();
  moveEnemies();
  console.log(road);
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
    requestAnimationFrame(gamePlay);
  }
}

function moveLines() {
  const dividers = document.querySelectorAll(".divider");
  dividers.forEach((divider) => {
    console.log("y", divider.y);
    if (divider.y >= 800) {
      divider.y = divider.y - 800;
    }
    divider.y = divider.y + player.speed;
    divider.style.top = divider.y + "px";
  });
}

function moveEnemies() {
  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    if (enemy.y >= 800) {
      enemy.y = enemy.y - 600;
      enemy.style.left = parseInt(Math.random() * 250) + "px";
    }
    enemy.y = enemy.y + player.speed;
    enemy.style.top = enemy.y + "px";
  });
}

function start() {
  console.log("clicked");
  //once clicked hide start screen and show game area
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;

  // lets make a divider:
  for (let x = 0; x <= 4; x++) {
    let divider = document.createElement("div");
    divider.className = "divider";
    divider.y = x * 150;
    divider.style.top = divider.y + "px";
    gameArea.append(divider);
  }

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
  // enemyCar car
  for (let i = 0; i <= 2; i++) {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.y = (i + 1) * 160;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = parseInt(Math.random() * 250) + "px";
    enemy.style.backgroundColor = "green";
    gameArea.append(enemy);
  }
}
