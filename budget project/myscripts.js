const incomesArrayKey = 'arrayIncomes-key';
const expensesArraykey = 'arrayExpenses-key';
let incomesArray = [];
let expensesArray = [];
const elemSubmitButton = document.querySelector('#submitInputButton');
elemSubmitButton.addEventListener('click', submitInputButton);
if (
  localStorage.getItem(incomesArrayKey) == null ||
  localStorage.getItem(expensesArraykey) == null
) {
  incomesArray = [];
  expensesArray = [];
} else {
  const arrayIncomeFromLoclalStorage = localStorage.getItem(incomesArrayKey);
  const arrayExpensesFromLoclalStorage = localStorage.getItem(expensesArraykey);
  incomesArray = JSON.parse(arrayIncomeFromLoclalStorage);
  expensesArray = JSON.parse(arrayExpensesFromLoclalStorage);
}

function saveToLocalStorage() {
  const incomesArrayJson = JSON.stringify(incomesArray);
  const expensesArrayJason = JSON.stringify(expensesArray);
  localStorage.setItem(incomesArrayKey, incomesArrayJson);
  localStorage.setItem(expensesArraykey, expensesArrayJason);
}

function putInObject(description, value) {
  const objOfTraffic = {
    trasactionDescription: description,
    trasactionValue: value,
  };
  return objOfTraffic;
}
function transactionToArray(expenseOrIncome, currentTransactionObject) {
  if (expenseOrIncome == 'income') {
    incomesArray.push(currentTransactionObject);
  } else if (expenseOrIncome == 'expense') {
    expensesArray.push(currentTransactionObject);
  }
}
function isValidValue(value) {
  if (isNaN(value) || value <= 0) {
    return false;
  } else {
    return true;
  }
}

function sumOfArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].trasactionValue;
  }
  return sum;
}

function balance(sumIncomes, sumExpenses) {
  return sumIncomes - sumExpenses;
}

function calculatePercentage() {
  const elemlistExpenses = document.querySelectorAll('.percentage');
  elemlistExpenses.forEach((element, index) => {
    const percent =
      (expensesArray[index].trasactionValue / sumOfArray(incomesArray)) * 100;
    element.innerText = floatFixTWO(percent) + '%';
  });
}
function totalExpnesesPercentage() {
  elemExpensesPercentage = document.querySelector('#expnesesPercentage');
  const expnesesPercentage =
    (sumOfArray(expensesArray) / sumOfArray(incomesArray)) * 100;

  elemExpensesPercentage.innerText = parseInt(expnesesPercentage) + '%';
}

function floatFixTWO(number) {
  return Number.parseFloat(number).toFixed(2);
}

//flow

function initialFromeArrays() {
  const sumIncomes = sumOfArray(incomesArray);
  const sumExpenses = sumOfArray(expensesArray);
  const balanceData = balance(sumIncomes, sumExpenses);

  //income
  incomesArray.forEach((element) => {
    DisplayData(
      'income',
      element.trasactionDescription,
      element.trasactionValue,
      sumIncomes,
      sumExpenses,
      balanceData
    );
  });

  //expense
  expensesArray.forEach((element) => {
    DisplayData(
      'expense',
      element.trasactionDescription,
      element.trasactionValue,
      sumIncomes,
      sumExpenses,
      balanceData
    );
  });
}
initialFromeArrays();

// check if is number and positive number

function getUserInput(expenseOrIncome, description, value) {
  if (!isValidValue(value)) {
    return;
  }
  return [expenseOrIncome, description, value];
}
// get iputs
function getIsExpenseOrIncome() {
  return document.querySelector('#type').value;
}

function getTransactionDescription() {
  return document.querySelector('#description').value;
}

function getValue() {
  return Number(document.querySelector('#amount').value);
}

function submitInputButton() {
  //after click submit
  const inputs = getUserInput(
    getIsExpenseOrIncome(),
    getTransactionDescription(),
    getValue()
  );
  if (!inputs) return;

  //0=expenseOrIncome, 1= description, 2= value
  const currentExpenseOrIncome = inputs[0];
  const currentDescription = inputs[1];
  const currentValue = inputs[2];
  const currentTransactionObject = putInObject(
    currentDescription,
    currentValue
  );
  transactionToArray(currentExpenseOrIncome, currentTransactionObject);
  const currentsumIncomes = sumOfArray(incomesArray);
  const currentsumExpenses = sumOfArray(expensesArray);
  const currentBalance = balance(currentsumIncomes, currentsumExpenses);
  //after get all inputs and calculate balance, total incomes, total expenses we want to display the data
  DisplayData(
    currentExpenseOrIncome,
    currentDescription,
    currentValue,
    currentsumIncomes,
    currentsumExpenses,
    currentBalance
  );
  saveToLocalStorage();
}

function DisplayData(
  currentExpenseOrIncome,
  currentDescription,
  currentValue,
  currentsumIncomes,
  currentsumExpenses,
  currentBalance
) {
  // display balance , total incomes, total expenses
  const elemBalance = document.querySelector('#balance');
  const elemIncomesSum = document.querySelector('#total-income');
  const elemExpensesSum = document.querySelector('#total-expense');
  elemBalance.innerHTML = floatFixTWO(currentBalance);
  elemIncomesSum.innerText = floatFixTWO(currentsumIncomes);
  elemExpensesSum.innerText = floatFixTWO(-1 * currentsumExpenses);
  //display transaction in tables
  addTransaction(
    currentExpenseOrIncome,
    currentDescription,
    currentValue,
    currentsumExpenses
  );
}

function addTransaction(
  currentExpenseOrIncome,
  currentDescription,
  currentValue,
  currentsumExpenses
) {
  const elemincome = document.querySelector('.income-items');
  const elemExpense = document.querySelector('.expense-items');

  if (currentExpenseOrIncome == 'income') {
    elemincome.innerHTML += `
        <div data-index="${incomesArray.length - 1}" class="income-item">
          <div class="income-left">
            <p class="transaction-description">${currentDescription}</p>
          </div>
          <div class="income-right">
            <p class="income-transaction transaction">${floatFixTWO(
              currentValue
            )}</p>
            <div class="removeBtn"><i  class="fa-regular fa-circle-xmark remove-button add-red"></i></div>
          </div>
        </div>`;
  } else if (currentExpenseOrIncome == 'expense') {
    elemExpense.innerHTML += `
        <div data-index="${expensesArray.length - 1}" class="expense-item">
          <div class="expense-left">
            <p class="transaction-description">${currentDescription}</p>
          </div>
          <div class="expense-right">
            <p class="income-transaction transaction">${floatFixTWO(
              currentValue
            )}</p>
            <div class = "red-squre"><p class="percentage expense-transaction transaction"></p></div>
            <div class="removeBtn"><i class="fa-regular fa-circle-xmark remove-button add-red"></i></div>
          </div>
        </div>`;
  }
  //calculate and display percentage
  calculatePercentage();
  totalExpnesesPercentage();
}
// remove buttons
document
  .querySelector('.income-items')
  .addEventListener('click', handleIncomeRemove);
document
  .querySelector('.expense-items')
  .addEventListener('click', handleExpenseRemove);
function handleIncomeRemove(e) {
  if (e.target.parentNode.classList.contains('removeBtn')) {
    const itemToRemove = e.target.parentNode.parentNode.parentNode;
    const indexToRemove = parseInt(itemToRemove.dataset.index);
    incomesArray.splice(indexToRemove, 1);
    itemToRemove.remove();
    updateDataAfterRemoval();
    updateIndices('.income-items .income-item', incomesArray);
  }
}

function handleExpenseRemove(e) {
  if (e.target.parentNode.classList.contains('removeBtn')) {
    const itemToRemove = e.target.parentNode.parentNode.parentNode;
    const indexToRemove = parseInt(itemToRemove.dataset.index);
    expensesArray.splice(indexToRemove, 1);
    itemToRemove.remove();
    updateDataAfterRemoval();
    updateIndices('.expense-items .expense-item', expensesArray);
  }
}

function updateIndices(selector, array) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.dataset.index = index;
  });
}
function updateDataAfterRemoval() {
  const currentsumIncomes = sumOfArray(incomesArray);
  const currentsumExpenses = sumOfArray(expensesArray);
  const currentBalance = balance(currentsumIncomes, currentsumExpenses);
  const elemBalance = document.querySelector('#balance');
  const elemIncomesSum = document.querySelector('#total-income');
  const elemExpensesSum = document.querySelector('#total-expense');
  elemBalance.innerHTML = floatFixTWO(currentBalance);
  elemIncomesSum.innerText = floatFixTWO(currentsumIncomes);
  elemExpensesSum.innerText = floatFixTWO(-1 * currentsumExpenses);

  calculatePercentage();
  totalExpnesesPercentage();
  saveToLocalStorage();
}

document.querySelector('#type').addEventListener('change', toggleMode);

function toggleMode() {
  const mode = document.querySelector('#type').value;
  const descriptionInput = document.querySelector('#description');
  const valueInput = document.querySelector('#amount');
  const submitIcon = document.querySelector('#submitInputButton');

  // Remove existing mode classes
  descriptionInput.classList.remove('income-mode', 'expense-mode');
  valueInput.classList.remove('income-mode', 'expense-mode');
  submitIcon.classList.remove('income-mode', 'expense-mode');

  // Add new mode classes based on selected mode
  if (mode === 'income') {
    descriptionInput.classList.add('income-mode');
    valueInput.classList.add('income-mode');
    submitIcon.classList.add('income-mode');
  } else {
    descriptionInput.classList.add('expense-mode');
    valueInput.classList.add('expense-mode');
    submitIcon.classList.add('expense-mode');
  }
}

UpdateDateHeader();
function UpdateDateHeader() {
  const monthnames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let currentDate = new Date(Date.now());
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let monthStr = monthnames[month];
  console.log(year);
  document.querySelector('h4').innerText += ` ${monthStr} ${year}`;
}
