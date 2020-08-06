const display = document.querySelector(".js-calc-screen");
const numButtons = document.querySelector(".js-calc-numbers");
const operatorButtons = document.querySelector(".js-calc-operators");
const equalsButton = document.querySelector(".js-calc-equals > button");
const editButtons = document.querySelector(".js-calc-edit");
let lastButtonPressed;

const add = (x) => (y) => x + y;
const subtract = (x) => (y) => x - y;
const multiply = (x) => (y) => x * y;
const divide = (x) => (y) => (y === 0 ? "Nope..." : x / y)
let solution;

const ops = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

let displayVal = "";

function updateDisplay(input) {
  if (!input) return displayVal

  const hasDecimals = () => {
    return String(input) === "." && hasDecimal(displayVal.split(" ").slice(-1)[0]) >= 1;
  };
    
  if (matchOperator(String(input)) && displayVal !== "") {
    displayVal += ` ${input} `
  } else if (hasDecimals()) {
    return displayVal
  } else {
    displayVal += `${input}`
  }

  display.textContent = displayVal;

  return displayVal
}

function hasDecimal(str) {
  return str.includes(".")
}

function matchOperator(input) {
  return String(input).match(/[\+\-\*\/\=]/);
}

function backspaceOnDisplay() {
  displayVal = removeOneChar(displayVal);
  display.textContent = displayVal;
};

function removeOneChar(str) {
  return str.trim().slice(0, -1).trim();
}

function clearDisplay() {
  displayVal = "";
  display.textContent = "";
};

function operate(array) {
  return array.reduce((last, current) => {
    if (matchOperator(current)) {
      return ops[current](Number(last));
    } else {
      return last(Number(current));
    }
  })
};

function inputHandler(node) {
  updateDisplay(node.dataset.value);
  lastButtonPressed = node;
};

numButtons.addEventListener("click", (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    inputHandler(evt.target);
  }
});

editButtons.addEventListener("click", (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    const value = evt.target.dataset.value;

    if (value === "clear") {
      clearDisplay();
    } else if (value === "back") {
      backspaceOnDisplay();
    }
  }
});

operatorButtons.addEventListener("click", (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    inputHandler(evt.target);
  }
});

equalsButton.addEventListener("click", (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    solution = operate(displayVal.split(" "));

    if (typeof solution === "number") {
      solution = Number(solution.toFixed(10));
    }

    clearDisplay();
    updateDisplay(solution);
    lastButtonPressed = evt.target;
  }
});
