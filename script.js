'use strict'
//Game: Dicey

//Document Objects

//Dice
const diceEl = document.querySelector('.dice')

//Buttons
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//Starting conditions
diceEl.classList.add('hidden')

//State variables
const scores = [0, 0]
let currentScore = 0
let activePlayer = 0

//Switch player function
const switchPlayer = () => {
  currentScore = 0
  document.getElementById(`current--${activePlayer}`).textContent = currentScore
  activePlayer = activePlayer === 0 ? 1 : 0
  document.querySelector('.player.player--0').classList.toggle('player--active')
  document.querySelector('.player.player--1').classList.toggle('player--active')
}

//Click event handler function for `ROLL DICE`
const rollHandler = () => {
  //1. Generating random dice roll
  let dice = Math.floor(Math.random() * 6) + 1

  //2. Display dice
  diceEl.classList.remove('hidden')
  diceEl.src = `dice-${dice}.png`

  //3. Check for a rolled 1
  if (dice !== 1) {
    currentScore += dice
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore
  } else {
    switchPlayer()
  }
  console.log(currentScore)
}

//Click event handler function for `HOLD`
const holdHandler = () => {
  //1. Adding current score to global score of player
  scores[activePlayer] += currentScore
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer]
  //2. Checking if global score >= 100
  if (scores[activePlayer] >= 100) {
    //2.a Finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner')
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active')
  } else {
    //2.b Switch Player
    switchPlayer()
  }
}

//Rolling Dice
btnRoll.addEventListener('click', rollHandler)
btnHold.addEventListener('click', holdHandler)
