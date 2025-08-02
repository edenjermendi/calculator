// ========================
// VARIABLES
// ========================
let userInput = "";
let displayInput = "";

let firstNumber = "";
let operator = "";
let waitingForSecond = false;

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
    if (waitingForSecond) {
      userInput = "";
      displayInput = "";
      waitingForSecond = false;
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
    const lastChar = userInput.slice(-1);
    if ("+-*/".includes(lastChar)) return;

    if (operator && firstNumber && !waitingForSecond) {
      let result = formatResult(operate(firstNumber, operator, userInput));
      firstNumber = result;
      displayInput = result;
      updateDisplay(displayInput);
      userInput = "";
    } else {
      firstNumber = displayInput;
    }

    operator = op;
    waitingForSecond = true;
  });
});

// ========================
// EVALUATE BUTTON (=)
// ========================
document.querySelector('#equals').addEventListener('click', () => {
  if (!operator || !firstNumber) return;
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
  waitingForSecond = false;
  firstNumber = "";
});

// ========================
// SPECIAL CHARACTERS (. () )
// ========================
document.querySelector('#period').addEventListener('click', () => {
  userInput += '.';
  displayInput += '.';
  updateDisplay(displayInput);
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
document.querySelector('#sign').addEventListener('click', () => {
  let current = Number(document.querySelector('.display').textContent);
  let newValue = formatResult(current * -1);
  userInput = displayInput = newValue;
  updateDisplay(displayInput);
});

document.querySelector('#factorial').addEventListener('click', () => {
  let num = Number(document.querySelector('.display').textContent);
  if (num < 0 || !Number.isInteger(num)) {
    displayInput = "Error";
    userInput = "";
  } else {
    let result = 1;
    for (let i = num; i > 0; i--) result *= i;
    displayInput = userInput = formatResult(result);
  }
  updateDisplay(displayInput);
});

document.querySelector('#square-root').addEventListener('click', () => {
  let num = Number(document.querySelector('.display').textContent);
  if (num < 0) {
    displayInput = "Error";
    userInput = "";
  } else {
    displayInput = userInput = formatResult(Math.sqrt(num));
  }
  updateDisplay(displayInput);
});

document.querySelector('#exponent').addEventListener('click', () => {
  const lastChar = userInput.slice(-1);
  if ("+-*/".includes(lastChar)) return;
  operator = "**";
  firstNumber = displayInput;
  userInput = "";
  displayInput += "^";
  updateDisplay(displayInput);
});
