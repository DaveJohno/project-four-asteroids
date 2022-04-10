let canvas;
let ctx;
let canvasWidth = window.innerWidth - 4;
let canvasHeight = window.innerHeight - 4;
let ship;
let keys = [];
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;
let pointCount = 0;
let round = 0;
let asteroidCount = 1;
let gamePause = false;
let gameover = false;
let game;
let gameOverCount = 0;

playerControls = {
  default_keys: {
    forward: { key: "ArrowUp", code: "ArrowUp", keyCode: 38 },
    left: { key: "ArrowLeft", code: "ArrowLeft", keyCode: 37 },
    right: { key: "ArrowRight", code: "ArrowRight", keyCode: 39 },
    brake: { key: "ArrowDown", code: "ArrowDown", keyCode: 40 },
    fire: { key: " ", code: "Space", keyCode: 32 },
  },
  player_keys: {
    forward: { key: "ArrowUp", code: "ArrowUp", keyCode: 38 },
    left: { key: "ArrowLeft", code: "ArrowLeft", keyCode: 37 },
    right: { key: "ArrowRight", code: "ArrowRight", keyCode: 39 },
    brake: { key: "ArrowDown", code: "ArrowDown", keyCode: 40 },
    fire: { key: " ", code: "Space", keyCode: 32 },
  },
  controller: { forward: {}, left: {}, right: {}, brake: {}, fire: {} },

  touch: { forward: {}, left: {}, right: {}, brake: {}, fire: {} },
};

const defaultKeys = playerControls.default_keys;
const playerKeys = playerControls.player_keys;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function levelSet() {
  for (let i = 0; i < asteroidCount; i++) {
    asteroids.push(new Asteroid());
  }
}

function gameOver() {
  lives = 0;
  ship.visible = false;

  ctx.fillStyle = "white";

  ctx.fillStyle = "white";
  if (canvasWidth < 500) {
    ctx.font = `20px  "Press Start 2P"`;
    ctx.fillText(
      "GAME OVER",
      canvasWidth / 2 - canvasWidth / 4,
      canvasHeight / 2
    );
    ctx.font = `15px  "Press Start 2P"`;
    ctx.fillText(
      "SCORE: " + score.toFixed(0),
      canvasWidth / 2 - canvasWidth / 4,
      canvasHeight / 2 + 20
    );
  } else {
    ctx.font = `50px  "Press Start 2P"`;
    ctx.fillText("GAME OVER", canvasWidth / 2 - 225, canvasHeight / 2);
    ctx.font = `40px  "Press Start 2P"`;
    ctx.fillText(
      "SCORE: " + score.toFixed(0),
      canvasWidth / 2 - 220,
      canvasHeight / 2 + 50
    );
  }
}

function SetupCanvas() {
  getUserById().then(() => {
    // console.log(data);
    if (!!data.loggedIn) {
      notloggedInScreen.style.display = "none";
      // console.log("logged in", "this data is:", data);
      canvas = document.querySelector("#my-canvas");
      ctx = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ship = new Ship();
      ship.Rotate(Math.floor(Math.random() * 359));

      document.body.addEventListener("keydown", (e) => {
        keys[e.keyCode] = true;
        if (
          e.keyCode === defaultKeys.fire.keyCode ||
          e.keyCode === playerKeys.fire.keyCode
        ) {
          bullets.push(new Bullet(ship.angle));
        }
      });

      togglePause();
      levelSet();

      gameOverCount = 0;

      document.body.addEventListener("keyup", (e) => (keys[e.keyCode] = false));

      Render();
    } else {
      console.log(`not logged in`);
    }
  });
}

class Ship {
  constructor() {
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.movingForward = false;
    this.speed = 0.03;
    this.velX = 0;
    this.velY = 0;
    this.rotateSpeed = 0.001;
    this.radius = 15;
    this.angle = 0;
    this.strokeColor = "white";
    this.noseX = canvasWidth / 2 + 15;
    this.noseY = canvasHeight / 2;
  }

  Rotate(dir) {
    this.angle += this.rotateSpeed * dir;
  }

  Update() {
    let radians = (this.angle / Math.PI) * 180;

    if (this.movingForward) {
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    }
    // if ship goes to side of screen
    if (this.x < this.radius) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = this.radius;
    }
    if (this.y < this.radius) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = this.radius;
    }

    this.velX *= 0.99;
    this.velY *= 0.99;

    this.x -= this.velX;
    this.y -= this.velY;
  }

  Draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    let vertAngle = (Math.PI * 2) / 3;
    let radians = (this.angle / Math.PI) * 180;
    this.noseX = this.x - this.radius * Math.cos(radians);
    this.noseY = this.y - this.radius * Math.sin(radians);

    for (let i = 0; i < 3; i++) {
      ctx.lineTo(
        this.x - this.radius * Math.cos(vertAngle * i + radians),
        this.y - this.radius * Math.sin(vertAngle * i + radians)
      );
    }

    ctx.closePath();
    ctx.stroke();
  }
}

class Bullet {
  constructor(angle) {
    this.visible = true;
    this.x = ship.noseX;
    this.y = ship.noseY;
    this.angle = angle;
    this.height = 2;
    this.width = 6;
    this.speed = 3.5;
    this.velX = 0;
    this.velY = 0;
  }
  Update() {
    var radians = (this.angle / Math.PI) * 180;
    this.x -= Math.cos(radians) * this.speed;
    this.y -= Math.sin(radians) * this.speed;
  }
  Draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Asteroid {
  constructor(x, y, radius, level, collisionRadius) {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * canvasWidth);
    this.y = y || Math.floor(Math.random() * canvasHeight);
    this.speed = 0.4;
    this.radius = radius || 50;
    this.angle = Math.floor(Math.random() * 359);
    this.strokeColor = "white";
    this.collisionRadius = collisionRadius || 46;
    this.level = level || 1;
  }

  Update() {
    let radians = (this.angle / Math.PI) * 180;

    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;

    // if ship goes to side of screen
    if (this.x < this.radius) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = this.radius;
    }
    if (this.y < this.radius) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = this.radius;
    }
  }

  Draw() {
    ctx.beginPath();
    let vertAngle = (Math.PI * 2) / 6;
    let radians = (this.angle / Math.PI) * 180;
    this.noseX = this.x - this.radius * Math.cos(radians);
    this.noseY = this.y - this.radius * Math.sin(radians);

    for (let i = 0; i < 6; i++) {
      ctx.lineTo(
        this.x - this.radius * Math.cos(vertAngle * i + radians),
        this.y - this.radius * Math.sin(vertAngle * i + radians)
      );
    }

    ctx.closePath();
    ctx.stroke();
  }
}

function CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
  let radiusSum;
  let xDiff;
  let yDiff;
  radiusSum = r1 + r2;
  xDiff = p1x - p2x;
  yDiff = p1y - p2y;

  if (radiusSum > Math.sqrt(xDiff * xDiff + yDiff * yDiff)) {
    return true;
  } else {
    return false;
  }
}

function Render() {
  //moving the ship
  ship.movingForward =
    keys[defaultKeys.forward.keyCode] || keys[playerKeys.forward.keyCode];

  // breaking ship
  if (keys[defaultKeys.brake.keyCode] || keys[playerKeys.brake.keyCode]) {
    ship.velX *= 0.96;
    ship.velY *= 0.96;
  }

  // rotating ship
  if (keys[defaultKeys.right.keyCode] || keys[playerKeys.right.keyCode]) {
    ship.Rotate(1);
  } else if (keys[defaultKeys.left.keyCode] || keys[playerKeys.left.keyCode]) {
    ship.Rotate(-1);
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.font = `21px  "Press Start 2P"`;
  ctx.fillText("SCORE: " + score.toFixed(0).toString(), 20, 55);
  ctx.fillText("LIVES: " + lives.toString(), 20, 30);
  ctx.fillText("Round: " + round.toString(), 20, 80);
  ctx.fillText("Top Score ", canvasWidth - 225, 30);
  ctx.fillText(topScore, canvasWidth - 225, 55);

  // if (topScore === undefined) {
  //   ctx.fillText("", canvasWidth - 225, 55);
  // } else {
  //   ctx.fillText(topScore, canvasWidth - 225, 55);
  // }

  if (lives <= 0) {
    gameover = true;
  }

  if (gameover === true) {
    gameOver();
    console.log(gameOverCount);
    if (gameOverCount === 0) {
      gameOverCount += 1;

      console.log(gameOverCount);
      console.log(lives);
      console.log("data: ", data);
      if (gameOverCount === 1 && lives === 0) {
        console.log("time to post");
        //post request here
        console.log("data 2: ", data);
        postHighScore();
      }
    }
  }

  if (asteroids.length !== 0) {
    for (let k = 0; k < asteroids.length; k++) {
      if (
        CircleCollision(
          ship.x,
          ship.y,
          11,
          asteroids[k].x,
          asteroids[k].y,
          asteroids[k].collisionRadius
        )
      ) {
        ship.x = canvasWidth / 2;
        Ship.y = canvasHeight / 2;
        ship.velX = 0;
        ship.velY = 0;
        lives -= 1;
      }
    }
  }

  if (asteroids.length !== 0 && bullets.length != 0) {
    loop1: for (let l = 0; l < asteroids.length; l++) {
      for (m = 0; m < bullets.length; m++) {
        if (
          CircleCollision(
            bullets[m].x,
            bullets[m].y,
            3,
            asteroids[l].x,
            asteroids[l].y,
            asteroids[l].collisionRadius
          )
        ) {
          if (asteroids[l].level === 1) {
            asteroids.push(
              new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 25, 2, 22),
              new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 25, 2, 22),
              new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 25, 2, 22)
            );
          } else if (asteroids[l].level === 2) {
            asteroids.push(
              new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 15, 3, 12),
              new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 15, 3, 12),
              new Asteroid(asteroids[l].x + 10, asteroids[l].y - 10, 15, 3, 12)
            );
          }
          asteroids.splice(l, 1);
          bullets.splice(m, 1);
          score += 20;
          pointCount += 20;
          break loop1;
        }
      }
    }
  }

  if (ship.visible) {
    ship.Update();
    ship.Draw();

    if (pointCount === 5000) {
      lives = lives + 1;
      pointCount = 0;
    }
  } else if (!ship.visible) {
    ship.x = canvasWidth + 10;
    ship.y = canvasHeight + 10;
    // gameOver();
  }

  if (bullets.length !== 0) {
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].Update();
      bullets[i].Draw();
    }
  }

  if (asteroids.length !== 0) {
    for (let j = 0; j < asteroids.length; j++) {
      asteroids[j].Update();
      asteroids[j].Draw(j);
    }
  }

  if (asteroids.length === 0) {
    asteroidCount > 10 ? (asteroidCount = 10) : (asteroidCount += 1);
    round += 1;
    levelSet();
  }

  if (gamePause === false) {
    requestAnimationFrame(Render);
  }
}
