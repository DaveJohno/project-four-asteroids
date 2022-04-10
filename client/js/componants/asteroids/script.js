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
const notloggedInScreen = document.querySelector(".not-logged-in");

notloggedInScreen.style.display = "flex";

//key binding inputs
const forwardKey = document.querySelector(".foward-key");
const leftKey = document.querySelector(".left-key");
const rightKey = document.querySelector(".right-key");
const brakeKey = document.querySelector(".brake-key");
const fireKey = document.querySelector(".fire-key");
let data;
let topScore = "";
let topTenScores;

async function getTopScores() {
  const res = await axios.get("/asteroids/scores", {});
  console.log(res.data);
  topTenScores = res.data;
  topScore = res.data[0].score;
}

// axios request for user by id
async function getUserById() {
  console.log("getting here line 34");
  const res = await axios.get("/sessions/", {});
  data = res.data;
  console.log(
    "this is the data:",
    data,
    "this is the round number",
    round,
    "this is the score:, ",
    score
  );
  return data;
}

getTopScores();

// post updated high scores

function postHighScore() {
  console.log(data);
  console.log(
    "this is the data a 2nd time :",
    data,
    "this is the round number a 2nd time",
    round,
    "this is the score a 2nd time:, ",
    score
  );
  axios
    .post("/asteroids/scores", {
      score: score,
      round: round,
      email: data.email,
      userId: data.userId,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
    })
    .then((res) => res.data)
    .then(() => {
      console.log(`12345`);
    });
}

function renderTopScoresList() {
  document.querySelector(".scoreboard-list ").innerHTML = topTenScores
    .map(
      (score, index) => `
      <li class="menu-list "> ${index + 1} </li>
      <li class="menu-list"> ${score.user_name} </li> <li class="menu-list">${
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
  console.log(playerKeys);
});

// key bindings
forwardKey.addEventListener("keyup", (key) => {
  console.log(key.key, key.code, key.keyCode);
  console.log(playerKeys.forward);

  playerKeys.forward.key = key.key;
  playerKeys.forward.code = key.code;
  playerKeys.forward.keyCode = key.keyCode;
});
leftKey.addEventListener("keyup", (key) => {
  console.log(key.key);
  leftKey.value = key.key;

  playerKeys.left.key = key.key;
  playerKeys.left.code = key.code;
  playerKeys.left.keyCode = key.keyCode;
});
rightKey.addEventListener("keyup", (key) => {
  console.log(key);
  rightKey.value = key.key;

  playerKeys.right.key = key.key;
  playerKeys.right.code = key.code;
  playerKeys.right.keyCode = key.keyCode;
});
brakeKey.addEventListener("keyup", (key) => {
  console.log(key);
  brakeKey.value = key.key;

  playerKeys.brake.key = key.key;
  playerKeys.brake.code = key.code;
  playerKeys.brake.keyCode = key.keyCode;
});
fireKey.addEventListener("keyup", (key) => {
  console.log(key);
  console.log();
  fireKey.value = key.key;

  playerKeys.fire.key = key.key;
  playerKeys.fire.code = key.code;
  playerKeys.fire.keyCode = key.keyCode;
});

// controlls save button
// document.querySelector(".save-controls-btn").addEventListener("click", () => {
//   console.log(forwardKey.value);
// });

// //controls default button
// document
//   .querySelector(".default-controls-btn")
//   .addEventListener("click", () => {
//     console.log(defaultKeys);
//     forwardKey.value = defaultKeys.forward.key;
//     leftKey.value = defaultKeys.left.key;
//     rightKey.value = defaultKeys.right.key;
//     brakeKey.value = defaultKeys.brake.key;
//     fireKey.value = defaultKeys.fire.key;
//   });
