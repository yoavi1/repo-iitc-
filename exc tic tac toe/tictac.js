// let player1 = 'yoav';
// let player2 = 'david';
// let boardDimention;
// let board = [];
// let emptyPlace = '-';
// let turn = player1;
// let correntWinner = '';
// let winnerStatistics = [];

let player1 = 'yoav';
let player2 = 'david';
// let boardDimention;
let board = [];
let emptyPlace = '-';
let turn = player1;
let correntWinner;
let winnerStatistics = [];

function getNames() {
  player1 = prompt('player1 enter name:');
  player2 = prompt('player2 enter name:');
}

function getDimantion() {
  boardDimention = parseInt(
    prompt('what is the dimantion of the board you want to play?: ')
  );
}

function creatBoard(boardDimention) {
  for (let row = 0; row < boardDimention; row++) {
    board.push([]);
    for (let colume = 0; colume < boardDimention; colume++) {
      board[row].push('|' + emptyPlace + '|');
    }
  }
}

function printBoard() {
  for (let row = 0; row < board.length; row++) {
    let strRow = '';
    for (let colume = 0; colume < board[row].length; colume++) {
      strRow += board[row][colume];
    }
    console.log(strRow);
  }
  console.log('');
}

function getPlaceToMove() {
  let rowToMove = parseInt(prompt(turn + ' enter row to move: '));
  let columeToMove = parseInt(prompt(turn + ' enter colume to move: '));
  while (board[rowToMove][columeToMove] !== '|' + emptyPlace + '|') {
    rowToMove = parseInt(prompt(turn + ' enter row to move again: '));
    columeToMove = parseInt(prompt(turn + ' enter colume to move again: '));
    // board[rowToMove][columeToMove] = turn;
  }
  if (turn === player1) {
    board[rowToMove][columeToMove] = '|x|';
  } else {
    board[rowToMove][columeToMove] = '|O|';
  }
}

function checkRow(rowIndex) {
  for (let colume = 0; colume < board[rowIndex].length; colume++) {
    if (board[rowIndex][colume] !== board[0][0]) {
      return false;
    }
  }
  return true;
}

function checkColume(columeIndex) {
  for (let row = 0; row < board.length; row++) {
    if (board[row][columeIndex] !== board[0][0]) {
      return false;
    }
  }
  return true;
}

function checkRowsWin() {
  for (let row = 0; row < board.length; row++) {
    if (!checkRow(row)) {
      return false;
    }
  }
  return true;
}
function checkColumesWin() {
  for (let colume = 0; colume < board.length; colume++) {
    if (!checkColume(colume)) {
      return false;
    }
  }
  return true;
}

function diagonalFromUpLeft() {
  for (let row = 0, colume = 0; row < board.length; row++, colume++) {
    if (board[0][0] != board[row][colume]) {
      return false;
    }
  }
  return true;
}

function diagonalBottomLeftToTopRight() {
  for (
    let row = board.length - 1, colume = 0;
    row >= 0 && colume <= board.length - 1;
    row--, colume++
  ) {
    if (board[board.length - 1][0] != board[row][colume]) {
      return false;
    }
  }
  return true;
}

function checkwin() {
  return checkRowsWin();
  // checkColumesWin()
  // diagonalFromUpLeft() ||
  // diagonalBottomLeftToTopRight()
}

function main() {
  creatBoard(3);
  printBoard();

  while (!checkwin()) {
    getPlaceToMove();
    printBoard();
    if (checkwin() == true) {
      break;
    }
    turn = turn === player1 ? player2 : player1;
  }
  console.log('the winner is: ' + turn);
}

main();
