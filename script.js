// update display
function updateDisplay(userInput) {
  let displayDiv = document.querySelector('.display');
  displayDiv.textContent = userInput;
}

updateDisplay();

// update 0-9 digits
let numberButtons = document.querySelectorAll('.number');
let userInput = "";

numberButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    userInput += button.textContent;
    updateDisplay(userInput);
    });
});

// clear display/userInput
let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
  userInput = "";
  updateDisplay(userInput);
});

// delete button
let deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', function () {
    userInput = userInput.slice(0, -1);
    updateDisplay(userInput);
});