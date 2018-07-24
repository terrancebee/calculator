const display = document.querySelector(".js-calc-screen");
const numButtons = document.querySelector(".js-calc-numbers");
const operatorButtons = document.querySelector(".js-calc-operators");
const equalsButton = document.querySelector(".js-calc-equals > button");
const editButtons = document.querySelector(".js-calc-edit");
let lastButtonPressed;

const add = (x) => (y) => x + y;
const subtract = (x) => (y) => x - y;
const multiply = (x) => (y) => x * y;
const divide = (x) => (y) => ( y === 0 ? "Nope..." : x / y )
let solution;

const ops = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

const matchOperator = (input) => {
    return input.match(/[\+\-\*\/\=]/);
}

let displayVal = "";

const findDecimals = (str) => {
    let count = 0;
    let pos = str.indexOf(".");

    while (pos !== -1) {
        count++;
        pos = str.indexOf(".", pos + 1);
    }

    return count;
};

const updateDisplay = (input) => {
    if (!input) return displayVal

    if (matchOperator(String(input)) && displayVal !== "") 
        displayVal += ` ${input} ` 
    else if (String(input) === "." 
             && findDecimals(displayVal.split(" ").slice(-1)[0]) >= 1)
        return displayVal
    else
        displayVal += `${input}` 

    display.textContent = displayVal;

    return displayVal
}

const backspaceOnDisplay = () => {
    displayVal = displayVal
                .trim()
                .slice(0, -1)
                .trim()

    display.textContent = displayVal;
};

const clearDisplay = () => { 
    displayVal = "";
    display.textContent = "";
};

const operate = (array) => {
    return array.reduce((last, current) => {
        if (matchOperator(current))
            return ops[current](Number(last));
        else 
            return last(Number(current));
    })
};

const inputHandler = (node) => {
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
        if (value === "clear")
            clearDisplay();
        else if (value === "back")
            backspaceOnDisplay();
    }
});

operatorButtons.addEventListener("click", (evt) => {
    if (evt.target.nodeName === "BUTTON") {
        inputHandler(evt.target);
    }
});

equalsButton.addEventListener("click", (evt) =>  {
    if (evt.target.nodeName === "BUTTON") {
        solution = operate(displayVal.split(" "));
        if (typeof solution === "number") 
            solution = Number(solution.toFixed(10));
        clearDisplay();
        updateDisplay(solution);
        lastButtonPressed = evt.target;
    }
});
