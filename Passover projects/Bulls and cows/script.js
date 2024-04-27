let playerName; //document.querySelector('#playerName');
let computerCodeNumbersArray = [];
let playerGuessesArray = [];
let trys = 0;
const guessesTable = document.querySelector('#guessesTable');
let bulls;
let cows;
// history use object
const historyGames = [];

function getPlayerName() {
  playerName = document.querySelector('#playerName').value;
}

function restGameOption() {
  document.querySelector('#victuryHedear').remove();
  document.querySelector('.startPage').style.display = 'inline';
  document.querySelector('#restGameButton').remove();
}

function changeNumber(btnNum) {
  const button = document.querySelector(`#${btnNum}`);
  let buttonValue = parseInt(button.innerText);
  if (buttonValue < 9) {
    buttonValue++;
  } else {
    buttonValue = 0;
  }
  button.innerText = buttonValue;
}

function newRound() {
  playerName = '';
  computerCodeNumbersArray = [];
  playerGuessesArray = [];
  trys = 0;
  bulls = 0;
  cows = 0;
  guessesTable.innerHTML = ` <tr>
            <th><button>?</button></th>
            <th><button>?</button></th>
            <th><button>?</button></th>
            <th><button>?</button></th>
            <th>bulls</th>
            <th>cows</th>
          </tr>
          <tr>
            <td>
              <button
                class="btnNumbers"
                id="btn1"
                onclick="changeNumber('btn1')"
              >
                0
              </button>
            </td>
            <td>
              <button
                class="btnNumbers"
                id="btn2"
                onclick="changeNumber('btn2')"
              >
                1
              </button>
            </td>
            <td>
              <button
                class="btnNumbers"
                id="btn3"
                onclick="changeNumber('btn3')"
              >
                2
              </button>
            </td>
            <td>
              <button
                class="btnNumbers"
                id="btn4"
                onclick="changeNumber('btn4')"
              >
                3
              </button>
            </td>
            <td><button onclick="calculateBullsAndCows()">go</button></td>
          </tr>`;
}

// after submit clicked hide the button of submit
function generateRandomCode() {
  for (arrayIndex = 0; arrayIndex < 4; arrayIndex++) {
    computerCodeNumbersArray[arrayIndex] = Math.floor(Math.random() * 10);
  }
}

function addCodeToPlayerGuessesArray() {
  const btnNumbers = document.querySelectorAll('.btnNumbers');
  for (indexArray = 0; indexArray < 4; indexArray++) {
    playerGuessesArray[indexArray] = btnNumbers[indexArray].innerText;
  }
}

function userGuessToTable() {
  guessesTable.insertRow(guessesTable.rows.length - 1);
  guessesTable.rows[
    guessesTable.rows.length - 2
  ].innerHTML += `<td>${playerGuessesArray[0]}</td>
    <td>${playerGuessesArray[1]}</td>
    <td>${playerGuessesArray[2]}</td>
    <td>${playerGuessesArray[3]}</td>
    <td>${bulls}</td>
    <td>${cows}</td>`;
}

function isDuplicate(array) {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (i == j) {
        continue;
      } else if (parseInt(array[i]) == parseInt(array[j])) {
        // document.querySelector('#duplicateAlert').style.display = 'inline';
        const duplicateWarrning = document.createElement('p');
        // duplicateWarrning.classList.add('gamePage');
        duplicateWarrning.innerText = 'duplicate try again!';
        document.querySelector('.gamePage').appendChild(duplicateWarrning);
        setTimeout(() => {
          duplicateWarrning.remove();
        }, 1800);
        return true;
      }
    }
  }
  return false;
}

function findCows(array1, array2) {
  numCows = 0;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (parseInt(array1[i]) == parseInt(array2[j])) {
        numCows++;
      }
    }
  }
  return numCows;
}

function findBulls(array1, array2) {
  numBulls = 0;
  for (i = 0; i < 4; i++) {
    if (array1[i] == array2[i]) {
      numBulls++;
    }
  }
  return numBulls;
}

function isWin() {
  if (bulls == 4) {
    return true;
  }
}

function startGame() {
  newRound();
  getPlayerName();
  //start only if user entered name
  if (document.querySelector('#playerName').value == '') {
    return;
  }
  //stop display the first page
  document.querySelector('.startPage').style.display = 'none';
  //display the game page
  document.querySelector('.gamePage').style.display = 'inline';

  generateRandomCode();
  while (isDuplicate(computerCodeNumbersArray)) {
    generateRandomCode();
  }
  console.log(computerCodeNumbersArray);
}

function calculateBullsAndCows() {
  addCodeToPlayerGuessesArray();

  if (!isDuplicate(playerGuessesArray)) {
    trys++;
    bulls = findBulls(computerCodeNumbersArray, playerGuessesArray);
    cows = findCows(computerCodeNumbersArray, playerGuessesArray);
    userGuessToTable();
    if (isWin()) {
      document.querySelector('.gamePage').style.display = 'none';
      const victuryHedear = document.createElement('h1');
      victuryHedear.setAttribute('id', 'victuryHedear');
      victuryHedear.innerText += `congratulation ${playerName} you win the game after only ${trys} trys`;
      document.querySelector('body').appendChild(victuryHedear);
      const restGameButton = document.createElement('button');
      restGameButton.setAttribute('id', 'restGameButton');
      document.querySelector('body').appendChild(restGameButton);
      restGameButton.value = 'reset game';
      restGameButton.addEventListener('click', restGameOption);
    }
  }
}

// findBulls
// findCows
//is win

// function findBulls(array) {
//     numBulls=0;
//     for (i = 0; i < 4; i++) {
//       for (j = 0; j < 4; j++) {
//         if (i == j) {
//           continue;
//         } else if(parseInt(array[i]) == (parseInt(array[j]))) {
//           numBulls++;
//         }
//       }
//     }
//     return numBulls;
//   }

//     function addTableRow(){

//     }

// function calculateBullsAndCows(){

// }
// function isWin(){

// }
// function isDuplicate(){

// }
