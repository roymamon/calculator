const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }
});

const display = document.querySelector(".display");
let currentInput = ""; 
let previousInput = ""; 
let operator = ""; 

function handleDigit(digit) {
    if (digit === "." && currentInput.includes(".")) return; 
    currentInput += digit;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === "") return;

    if (previousInput !== "") {
        const result = operate(operator, parseFloat(previousInput), parseFloat(currentInput));
        updateDisplay(result);
        previousInput = String(result); 
    } else {
        previousInput = currentInput; 
    }

    operator = op; 
    currentInput = ""; 
}

function calculateResult() {
    if (currentInput === "" || previousInput === "" || operator === "") return;
    const result = operate(operator, parseFloat(previousInput), parseFloat(currentInput));
    updateDisplay(result);
    operator = ""; 
    previousInput = ""; 
    currentInput = String(result); 
}

function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
}

function updateDisplay(value) {
    display.textContent = value;
}

document.querySelectorAll(".digit").forEach((button) =>
    button.addEventListener("click", () => handleDigit(button.textContent))
);

document.querySelectorAll(".operator").forEach((button) =>
    button.addEventListener("click", () => handleOperator(button.textContent))
);

document.querySelector(".equals").addEventListener("click", calculateResult);
document.querySelector(".clear").addEventListener("click", clearCalculator);

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mousedown", () => {
        button.classList.add("active"); 
    });

    button.addEventListener("mouseup", () => {
        button.classList.remove("active"); 
    });

    button.addEventListener("mouseleave", () => {
        button.classList.remove("active"); 
    });
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Can't Divide By Zero" : a / b);

const operate = (operation, a, b) => {
    switch (operation) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "Invalid operation";
    }
};