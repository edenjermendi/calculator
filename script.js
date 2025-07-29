// main inputs
let userInput = "";
let displayInput = "";

// update display
function updateDisplay(input) {
  let displayDiv = document.querySelector('.display');
  displayDiv.textContent = input;
}

updateDisplay(displayInput);

// update 0-9 digits
let numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    userInput += button.textContent;
    displayInput += button.textContent;
    updateDisplay(displayInput);
  });
});

// clear display/userInput
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

// update '+ - x ÷' operators
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
