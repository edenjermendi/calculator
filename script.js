// ========================
// VARIABLES
// ========================
let userInput = "";
let displayInput = "";

let firstNumber = "";
let operator = "";
let waitingForSecond = false;
let resultDisplayed = false;

// ========================
// UTILITY FUNCTIONS
// ========================
function formatResult(num) {
  if (!isFinite(num)) return "Error";
  if (Math.abs(num) > 999999999 || Math.abs(num) < 0.000001) {
    return Number(num).toExponential(5);
  }
  return Number(num).toFixed(8).replace(/\.?0+$/, '');
}

function updateDisplay(input) {
  document.querySelector('.display').textContent = input;
}

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") return a / b;
  return "Error";
}

updateDisplay(displayInput);

// ========================
// DIGIT BUTTONS (0-9)
// ========================
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener("click", () => {
    if (waitingForSecond || resultDisplayed) {
      userInput = "";
      displayInput = "";
      waitingForSecond = false;
      resultDisplayed = false;
      clearActiveOperator();
    }
    userInput += button.textContent;
    displayInput += button.textContent;
    updateDisplay(displayInput);
  });
});

// ========================
// CONTROL BUTTONS
// ========================
document.querySelector('#clear').addEventListener('click', () => {
  userInput = "";
  displayInput = "";
  firstNumber = "";
  operator = "";
  waitingForSecond = false;
  resultDisplayed = false;
  clearActiveOperator();
  updateDisplay(displayInput);
});

document.querySelector('#delete').addEventListener('click', () => {
  userInput = userInput.slice(0, -1);
  displayInput = displayInput.slice(0, -1);
  updateDisplay(displayInput);
});

// ========================
// OPERATOR BUTTONS (+ - x ÷)
// ========================
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener("click", () => {
    const symbol = button.textContent;
    const op = symbol === "x" ? "*" : symbol === "÷" ? "/" : symbol;

    if (!userInput && !firstNumber) return; // don’t allow leading operator

    if (operator && waitingForSecond) {
      operator = op; // change operator if user clicks again
      setActiveOperator(button);
      return;
    }

    if (firstNumber && operator && userInput && !waitingForSecond) {
      const result = formatResult(operate(firstNumber, operator, userInput));
      firstNumber = result;
      displayInput = result;
      updateDisplay(displayInput);
      userInput = "";
    } else if (!firstNumber && userInput) {
      firstNumber = userInput;
      userInput = "";
    }


    operator = op;
    waitingForSecond = true;
    resultDisplayed = false;
    setActiveOperator(button);
  });
});

// ========================
// EVALUATE BUTTON (=)
// ========================
document.querySelector('#equals').addEventListener('click', () => {
  if (!firstNumber || !operator || !userInput) return;

  let second = userInput;
  let result;

  if (operator === "/" && Number(second) === 0) {
    result = "Nice try 😏";
  } else if (operator === "**") {
    result = formatResult(Math.pow(Number(firstNumber), Number(second)));
  } else {
    result = formatResult(operate(firstNumber, operator, second));
  }

  displayInput = userInput = result;
  updateDisplay(displayInput);

  operator = "";
  firstNumber = "";
  waitingForSecond = false;
  resultDisplayed = true;
  clearActiveOperator();
});

// ========================
// SPECIAL CHARACTERS (. () )
// ========================
document.querySelector('#period').addEventListener('click', () => {
  if (!userInput.includes('.')) {
    userInput += '.';
    displayInput += '.';
    updateDisplay(displayInput);
  }
});

document.querySelector('#open-bracket').addEventListener('click', () => {
  displayInput = "Brackets unsupported";
  updateDisplay(displayInput);
});

document.querySelector('#closed-bracket').addEventListener('click', () => {
  displayInput = "Brackets unsupported";
  updateDisplay(displayInput);
});

// ========================
// ADVANCED BUTTONS (± ! √ ^)
// ========================
// SIGN TOGGLE (±)
document.querySelector('#sign').addEventListener('click', () => {
  if (!userInput) return;
  let current = Number(userInput);
  userInput = formatResult(current * -1);
  displayInput = userInput;
  updateDisplay(displayInput);
});

// FACTORIAL (!)
document.querySelector('#factorial').addEventListener('click', () => {
  if (!userInput) return;
  let num = Number(userInput);
  if (num < 0 || !Number.isInteger(num)) {
    displayInput = "Error";
    userInput = "";
  } else {
    let result = 1;
    for (let i = num; i > 0; i--) result *= i;
    userInput = formatResult(result);
    displayInput = userInput;
  }
  updateDisplay(displayInput);
});

// SQUARE ROOT (√)
document.querySelector('#square-root').addEventListener('click', () => {
  if (!userInput) return;
  let num = Number(userInput);
  if (num < 0) {
    displayInput = "Error";
    userInput = "";
  } else {
    userInput = formatResult(Math.sqrt(num));
    displayInput = userInput;
  }
  updateDisplay(displayInput);
});

document.querySelector('#exponent').addEventListener('click', () => {
  if (!userInput) return;
  operator = "**";
  firstNumber = userInput;
  userInput = "";
  displayInput += "^";
  updateDisplay(displayInput);
  waitingForSecond = true;
});

// ========================
// HELPER FUNCTIONS FOR UI
// ========================
function setActiveOperator(button) {
  clearActiveOperator();
  button.classList.add('active-op');
}

function clearActiveOperator() {
  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('active-op');
  });
}
