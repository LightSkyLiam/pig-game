'use strict';

const rollDice = document.querySelector(`.btn--roll`);
const dice = document.querySelector(`.dice`);
const displayedScore1 = document.getElementById(`score--1`);
const displayedScore2 = document.getElementById(`score--2`);
const displayedCurrentScore1 = document.getElementById(`current--1`);
const displayedCurrentScore2 = document.getElementById(`current--2`);
const player1 = document.querySelector(`.player--1`);
const player2 = document.querySelector(`.player--2`);
const hold = document.querySelector(`.btn--hold`);
const newGame = document.querySelector(`.btn--new`);
let score = [0, 0];
let currentscore = 0;
let turn = 1;

const init = () => {
  score = [0, 0];
  currentscore = 0;
  turn = 1;
  dice.style.display = `none`;
  displayedScore1.textContent = 0;
  displayedScore2.textContent = 0;
  displayedCurrentScore1.textContent = 0;
  displayedCurrentScore2.textContent = 0;
  player1.classList.add(`player--active`);
  player2.classList.remove(`player--active`);
  player1.classList.remove(`player--winner`);
  player2.classList.remove(`player--winner`);
  rollDice.removeAttribute(`disabled`);
  hold.removeAttribute(`disabled`);
};

const disableBtn = () => {
  rollDice.setAttribute(`disabled`, true);
  hold.setAttribute(`disabled`, true);
};

const switchTurn = player => {
  currentscore = 0;
  if (player === 1) {
    turn = 2;
    displayedCurrentScore1.textContent = currentscore;
  } else {
    turn = 1;
    displayedCurrentScore2.textContent = currentscore;
  }
  player1.classList.toggle(`player--active`);
  player2.classList.toggle(`player--active`);
};
init();

rollDice.addEventListener(`click`, () => {
  const currentScoreAdd = player => {
    currentscore += diceRolled;
    if (player === 1) {
      displayedCurrentScore1.textContent = currentscore;
    } else {
      displayedCurrentScore2.textContent = currentscore;
    }
  };
  let diceRolled = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${diceRolled}.png`;
  dice.style.display = `block`;

  // player 1 turn
  if (turn === 1) {
    if (diceRolled === 1) {
      switchTurn(1);
    } else {
      currentScoreAdd(1);
    }
  }
  // player 2 turn
  else {
    if (diceRolled === 1) {
      switchTurn(2);
    } else {
      currentScoreAdd(2);
    }
  }
});

hold.addEventListener(`click`, () => {
  if (turn === 1) {
    score[0] += currentscore;
    displayedScore1.textContent = score[0];
    if (score[0] >= 100) {
      player1.classList.toggle(`player--winner`);
      player1.classList.toggle(`player--active`);
      disableBtn();
    } else {
      switchTurn(1);
    }
  } else {
    score[1] += currentscore;
    displayedScore2.textContent = score[1];

    if (score[1] >= 100) {
      player2.classList.toggle(`player--winner`);
      player2.classList.toggle(`player--active`);

      disableBtn();
    } else {
      switchTurn(2);
    }
  }
  dice.style.display = `none`;
  displayedCurrentScore1.textContent = 0;
});
newGame.addEventListener(`click`, init);
