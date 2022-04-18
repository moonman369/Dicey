"use strict";
/*---------Game: Dicey---------*/
/*-------Author: MoonMan-------*/

//Document Objects

//Dice
const diceEl = document.querySelector(".dice");

//Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnInstruc = document.querySelector(".btn--instruc");

//Instruction Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//Starting conditions
diceEl.classList.add("hidden");
document.getElementById("victory--0").classList.add("hidden");
document.getElementById("victory--1").classList.add("hidden");

//State variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Switch player function
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(".player.player--0")
    .classList.toggle("player--active");
  document
    .querySelector(".player.player--1")
    .classList.toggle("player--active");
};

//Click event handler function for `ROLL DICE`
const rollHandler = () => {
  //1. Generating random dice roll
  let dice = Math.floor(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  //3. Check for a rolled 1
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
  console.log(currentScore);
};

//Click event handler function for `HOLD`
const holdHandler = () => {
  //1. Adding current score to global score of player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Checking if global score >= 100
  if (scores[activePlayer] >= 100) {
    //2.a Finish the game

    //i. Add Winner template
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    //ii. Remove active player template
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    //iii. Set current to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //iv. Reveal Victory tag
    document
      .getElementById(`victory--${activePlayer}`)
      .classList.remove("hidden");

    //v. Disable `ROLL` and `HOLD` buttons
    document.getElementById("roll").disabled = true;
    document.getElementById("hold").disabled = true;
  } else {
    //2.b Switch Player
    switchPlayer();
  }
};

//Click event handler for `NEW GAME`
const handleNewGame = () => {
  //1. Removing Winner template
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  //2. Hide dice
  diceEl.classList.add("hidden");

  //3. Hide Victory tag from previous game
  document.getElementById(`victory--${activePlayer}`).classList.add("hidden");

  //4. Set active player to PLAYER 1 (player--0)
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  //5. Set current scores to 0
  currentScore = 0;
  document.getElementById("current--0").textContent = currentScore;
  document.getElementById("current--1").textContent = currentScore;

  //6. Set scores to 0
  scores = [0, 0];
  console.log(scores);
  document.getElementById("score--0").textContent = scores[0];
  document.getElementById("score--1").textContent = scores[1];

  //7. Re-enable `ROLL` and `HOLD` buttons
  document.getElementById("roll").disabled = false;
  document.getElementById("hold").disabled = false;
};

//Click event handler for `INSTRUCTIONS`
const handleOpenInstuctions = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Event handler for close instructions
const handleCloseInstuctions = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
//`ROLL`
btnRoll.addEventListener("click", rollHandler);

//`HOLD`
btnHold.addEventListener("click", holdHandler);

//`NEW GAME`
btnNew.addEventListener("click", handleNewGame);

//'INSTRUCTIONS'
//Open
btnInstruc.addEventListener("click", handleOpenInstuctions);
//Close
//Click X
document
  .querySelector(".close-modal")
  .addEventListener("click", handleCloseInstuctions);
//Click overlay
overlay.addEventListener("click", handleCloseInstuctions);
//Keydown ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !modal.classList.contains("hidden"))
    handleCloseInstuctions();
});
