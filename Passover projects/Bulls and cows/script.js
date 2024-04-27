const playerName = document.querySelector('#playerName');
let computerCodeNumbersArray =[];
let playerGuessesArray = [];
let trys = 0;
const guessesTable =document.querySelector('#guessesTable');
let bulls;
let cows;
// history use object
const historyGames= [];


function changeNumber(btnNum){
    const button = document.querySelector(`#${btnNum}`)
    let buttonValue = parseInt(button.innerText);
    if(buttonValue<9){
        buttonValue++
    }
    else{
        buttonValue=0
    }
    button.innerText=buttonValue;
    document.querySelector("#duplicateAlert").style.display = "none";
}

function newRound(){
    computerCodeNumbersArray = [];
    playerGuessesArray = [];
    trys = 0;
    bulls = 0;
    cows = 0;
    // document.querySelector('#btn1').innerText=0;
    // document.querySelector('#btn2').innerText=1;
    // document.querySelector('#btn3').innerText=2;
    // document.querySelector('#btn4').innerText=3;
}


    // after submit clicked hide the button of submit
function generateRandomCode(){
    for(arrayIndex= 0; arrayIndex<4;arrayIndex++){
        computerCodeNumbersArray[arrayIndex] = Math.floor(Math.random()*10);
}
}

function addCodeToPlayerGuessesArray(){
    const btnNumbers = document.querySelectorAll('.btnNumbers');
for(indexArray = 0;indexArray< 4; indexArray++){
  playerGuessesArray[indexArray] = btnNumbers[indexArray].innerText;
}
}

function userGuessToTable(){
    guessesTable.insertRow(guessesTable.rows.length-1);
    guessesTable.rows[guessesTable.rows.length-2].innerHTML += `<td>${playerGuessesArray[0]}</td>
    <td>${playerGuessesArray[1]}</td>
    <td>${playerGuessesArray[2]}</td>
    <td>${playerGuessesArray[3]}</td>
    <td>${bulls}</td>
    <td>${cows}</td>`
}

function isDuplicate(array) {
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if (i == j) {
          continue;
        } else if(parseInt(array[i]) == (parseInt(array[j]))) {
        
            document.querySelector("#duplicateAlert").style.display = "inline"
          return true;
        }
      }
    }
    return false
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

  function isWin(){
    if(bulls==4){
        return true
    }
  }

function startGame(){
    newRound()
    generateRandomCode()
while(isDuplicate(computerCodeNumbersArray)){
    generateRandomCode()
}
    // move to the game page
    // the user choose code
}

function calculateBullsAndCows(){
   addCodeToPlayerGuessesArray();

   if(!isDuplicate(playerGuessesArray)){
   trys++;
   bulls = findBulls(computerCodeNumbersArray,playerGuessesArray);
   cows = findCows(computerCodeNumbersArray,playerGuessesArray);
   userGuessToTable();
   if(isWin()){
    // gameInfo = {Name:playerName,
    //      trys:trys,
    //      code: function(){
    //         codeNum = "";
    //                for (const iterator of computerCodeNumbersArray) {
    //                codeNum+ iterator  } }
    //                }
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


