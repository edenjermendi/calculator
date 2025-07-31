// main inputs
let userInput = "";
let displayInput = "";

// display
function updateDisplay(input) {
  let displayDiv = document.querySelector('.display');
  displayDiv.textContent = input;
}

updateDisplay(displayInput);

// 0-9 digits
let numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    userInput += button.textContent;
    displayInput += button.textContent;
    updateDisplay(displayInput);
  });
});

// clear button
let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
  userInput = "";
  displayInput = "";
  updateDisplay(displayInput);
});

// delete button
let deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', function () {
  userInput = userInput.slice(0, -1);
  displayInput = displayInput.slice(0, -1);
  updateDisplay(displayInput);
});

// '+ - x ÷' operators
let operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    let symbol = button.textContent;

    if (symbol === "x") {
      userInput += "*";
      displayInput += "x";
    } else if (symbol === "÷") {
      userInput += "/";
      displayInput += "÷";
    } else {
      userInput += symbol;
      displayInput += symbol;
    }

    updateDisplay(displayInput);
  });
});

// '= . ( )' buttons

let equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', function () {
  try {
    let result = eval(userInput);
    userInput = result.toString();
    displayInput = result.toString();
    updateDisplay(displayInput);
  } catch (error) {
    displayInput = "Error";
    updateDisplay(displayInput);
  }
});

let periodButton = document.querySelector('#period');
periodButton.addEventListener('click', function () {
  userInput += '.';
  displayInput += '.';
  updateDisplay(displayInput);
});

let openBracket = document.querySelector('#open-bracket');
openBracket.addEventListener('click', function () {
  userInput += '(';
  displayInput += '(';
  updateDisplay(displayInput);
});

let closeBracket = document.querySelector('#closed-bracket');
closeBracket.addEventListener('click', function () {
  userInput += ')';
  displayInput += ')';
  updateDisplay(displayInput);
});

// '± ! ^ √' buttons

let signButton = document.querySelector('#sign');
signButton.addEventListener('click', function () {
  let displayDiv = document.querySelector('.display'); //grab element
  let currentValue = displayDiv.textContent;  //read what's on screen
  let newValue = Number(currentValue) * -1;  //convert
  displayInput = newValue.toString(); // vvv
  userInput = newValue.toString();  // important to keep BOTH inputs updated
  updateDisplay(displayInput);
});

function factorial(n) {
  let result = 1;
  for (let i = n; i > 0; i--) {
    result *= i;
  }
  return result;
}

let factorialButton = document.querySelector('#factorial');

factorialButton.addEventListener('click', function () {
  let displayDiv = document.querySelector('.display');
  let currentValue = displayDiv.textContent;
  let number = Number(currentValue);

  if (number < 0 || !Number.isInteger(number)) {
    displayInput = "Error";
    userInput = "";
  } else {
    let result = factorial(number);
    displayInput = result.toString();
    userInput = result.toString();
  }

  updateDisplay(displayInput);
});





