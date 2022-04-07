//pause menu
const pauseMenu = document.querySelector("#pauseMenu");
const startContinueBtn = document.querySelector(".start-game");
const menuPLayerScore = document.querySelector("#menuScore");
const resetGamesBtn = document.querySelector(".reset-btn");
const scoreboardList = document.querySelector(".scoreboard-list");
const scoreboardMenu = document.querySelector("#scoreboardMenu");
const highScoresBtn = document.querySelector(".high-scores");
const backBtn = document.querySelector(".back-to-pause-menu");
const optionsMenu = document.querySelector(".options-menu");
const controlsMenu = document.querySelector("#controlsMenu");

//key binding inputs
const forwardKey = document.querySelector(".foward-key");
const leftKey = document.querySelector(".left-key");
const rightKey = document.querySelector(".right-key");
const brakeKey = document.querySelector(".brake-key");
const fireKey = document.querySelector(".fire-key");

let topScore = "";
let topTenScores;

async function getTopScores() {
  const res = await axios.get("/asteroids/scores", {});
  topTenScores = res.data;
  topScore = res.data[0].score;
}

getTopScores();

function renderTopScoresList() {
  document.querySelector(".scoreboard-list ").innerHTML = topTenScores
    .map(
      (score, index) => `
      <li class="menu-list "> ${index + 1} </li>
      <li class="menu-list"> ${score.player_name} </li> <li class="menu-list">${
        score.score
      } </li>
    `
    )
    .join("");
}

//pause
function togglePause() {
  if (!gamePause) {
    gamePause = true;
    pauseMenu.classList.add("show");
    scoreboardMenu.classList.add("hidden");
    optionsMenu.classList.add("hidden");
    controlsMenu.classList.add("hidden");

    if (round > 0) {
      startContinueBtn.innerText = "Continue Game";
      menuPLayerScore.innerText = `Score: ${score.toFixed(0).toString()}`;
      menuPLayerScore.classList.remove("hidden");
    } else {
      menuPLayerScore.classList.add("hidden");
    }
  } else if (gamePause) {
    gamePause = false;
    pauseMenu.classList.remove("show");
    Render();
  }
}

//menu controlls
//escape key press
window.addEventListener("keydown", (e) => {
  var key = e.keyCode;
  if (round !== 0) {
    key === 27 && togglePause();
  }
});

//continue button
startContinueBtn.addEventListener("click", () => {
  togglePause();
  round = 1;
  pauseMenu.classList.add("hidden");
});
resetGamesBtn.addEventListener("click", () => location.reload());

//high scores btn
document.querySelector(".high-scores").addEventListener("click", () => {
  renderTopScoresList();
  scoreboardMenu.classList.remove("hidden");
  scoreboardMenu.classList.add("flex");
});

// back button
backBtn.addEventListener("click", () => {
  scoreboardMenu.classList.add("hidden");
  scoreboardMenu.classList.remove("flex");
});

// options Btn button
document.querySelector(".options").addEventListener("click", () => {
  optionsMenu.classList.remove("hidden");
  scoreboardMenu.classList.remove("flex");
});

// options back button
document.querySelector(".options-back-btn").addEventListener("click", () => {
  optionsMenu.classList.add("hidden");
});

//constrols menu options
//controls btn
document.querySelector(".controls-btn").addEventListener("click", () => {
  controlsMenu.classList.remove("hidden");
});

//controls back button
document.querySelector(".controls-back-btn").addEventListener("click", () => {
  controlsMenu.classList.add("hidden");
});

// key bindings
forwardKey.addEventListener("keyup", (key) => {
  console.log(key);
  forwardKey.value = key.code;
});
leftKey.addEventListener("keyup", (key) => {
  console.log(key.key);
});
rightKey.addEventListener("keyup", (key) => {
  console.log(key);
});
brakeKey.addEventListener("keyup", (key) => {
  console.log(key);
});
fireKey.addEventListener("keyup", (key) => {
  console.log(key);
});
