/*----- constants -----*/


/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/

const COLORS = {
  "1": "white",
  "-1": "black",
  "null": "orange"
};

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board;
let turn;
let winner = null;

const messageEl = document.querySelector("h1");
const playAgainBtn = document.querySelector("button");
const boardEls = [...document.querySelectorAll("#board > div")];

document.getElementById("board").addEventListener("click", handleMove);
playAgainBtn.addEventListener("click", init)
init();

function init() {
  board = [
    null, null, null,
    null, null, null,
    null, null, null
  ]
  turn = 1;
  winner = null;
  render()
}

//4.2
function render() {
  //4.2.1
  renderBoard();
  //4.2.2
  renderMessage();
}

function renderBoard() {
  board.forEach(function(item, idx) {
      const cellId = `sq-${idx}`;
      const cellEl = document.getElementById(cellId);
      cellEl.style.backgroundColor = COLORS[item]
  
  })
}

function renderMessage() {
   if (winner === "T") {
    messageEl.innerText = "It's a tie!"
  } else if (winner) {
    messageEl.innerHTML = `<span>Congratulation! ${COLORS[winner].toUpperCase()}</span>'s Wins`
  } else {
     console.log(COLORS[turn]);
    messageEl.innerHTML = `<span>${COLORS[turn].toUpperCase()}</span>'s Turn`
  }
}

//5
function handleMove(evt) {
  console.log("handle clicked");
   const index = boardEls.indexOf(evt.target);

  if (board[index] !== null) return;

  if (winner !== null) return; 

  board[index] = turn;
  turn = turn * -1;

  //5.6
  getWinner();
  //5.7
  let count = 0;
 for (let i = 0; i < board.length; i++) {
      if (board[i] !== null) {
        count += 1;
      }
 }
  if (count === board.length) {
    winner = 'T';
  }
  render()
}
function getWinner () {
    let winnerIndex;
    for (let i = 0; i < winningCombination.length; i++) {
      let total = 0;
      
      for (let j = 0; j < winningCombination[i].length; j++) {
        let boardIndex = winningCombination[i][j];
        total = total + board[boardIndex];
        winnerIndex = boardIndex;
      }
      total = Math.abs(total);
      if (total === 3) {
        winner = board[winnerIndex];
         return;
      
      }  
    }
  }


