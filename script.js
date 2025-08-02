// ========================
// VARIABLES
// ========================
let userInput = "";
let displayInput = "";

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
    const lastChar = userInput.slice(-1);
    if ("+-*/".includes(lastChar)) return;

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

// ========================
// EVALUATE BUTTON (=)
// ========================
document.querySelector('#equals').addEventListener('click', () => {
  try {
    const operators = ["**", "+", "-", "*", "/"];
    let foundOp = operators.find(op => userInput.includes(op));

    if (foundOp) {
      let [a, b] = userInput.split(foundOp);
      if (foundOp === "/") {
        if (Number(b) === 0) {
          displayInput = "Nice try 😏";
        } else {
          displayInput = formatResult(operate(a, "/", b)).toString();
        }
      } else if (foundOp === "**") {
        displayInput = formatResult(Math.pow(Number(a), Number(b))).toString();
      } else {
        displayInput = formatResult(operate(a, foundOp, b)).toString();
      }
    } else {
      displayInput = "Error";
    }

    userInput = displayInput;
    updateDisplay(displayInput);
  } catch {
    displayInput = "Error";
    updateDisplay(displayInput);
  }
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
  userInput += '**';
  displayInput += '^';
  updateDisplay(displayInput);
});
