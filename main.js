const currentOperandDisplay = document.querySelector(".current-operand");
const previousOperandDisplay = document.querySelector(".previous-operand");
const buttonsNodeList = document.querySelectorAll(".button");
const buttons = [...buttonsNodeList];

// Calculator state
let currentOperand = "";
let previousOperand = "";
let operation = null;

// Clear everything
function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  updateDisplay();
}

// Delete last character
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

// Append number to current operand
function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

// Choose operation
function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
}

// Calculate result
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "−":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = computation;
  operation = null;
  previousOperand = "";
  updateDisplay();
}

// Toggle positive/negative
function toggleSign() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateDisplay();
}

// Handle percentage
function percentage() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) / 100).toString();
  updateDisplay();
}

// Update the display
function updateDisplay() {
  currentOperandDisplay.textContent = currentOperand || "0";
  if (operation != null) {
    previousOperandDisplay.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandDisplay.textContent = "";
  }
}

// Event listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (button.classList.contains("operator")) {
      if (buttonText === "=") {
        calculate();
      } else {
        chooseOperation(buttonText);
      }
    } else if (button.classList.contains("function")) {
      if (buttonText === "AC") {
        clear();
      } else if (buttonText === "⌫") {
        deleteNumber();
      } else if (buttonText === "+/-") {
        toggleSign();
      } else if (buttonText === "%") {
        percentage();
      }
    } else {
      appendNumber(buttonText);
    }
  });
});

// Initialize
clear();
