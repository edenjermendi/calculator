function updateDisplay(userInput) {
  let displayDiv = document.querySelector('.display');
  displayDiv.textContent = userInput;
}

updateDisplay();

let numberButtons = document.querySelectorAll('.number');

let userInput = "";

numberButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    userInput += button.textContent;
    updateDisplay(userInput);
    });
});