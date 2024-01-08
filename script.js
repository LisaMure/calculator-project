const buttons = document.querySelectorAll("button");
const input = document.getElementById("input-form");
const resultsEl = document.getElementById("results");
const clearAll = document.getElementById("clear-all");
const deleteBtn = document.getElementById("delete-btn");
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let operator = "";
let calculationPerformed = false;

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;

    // Check if the value of button not a number or decimal point
    if (!isNaN(buttonValue) || buttonValue === ".") {
      input.value += buttonValue;
      resultsEl.innerHTML = input.value;
    } else if (button.classList.contains("btn-operator")) {
      // Check if the button is an operator
      if (operator !== "") {
        secondNumber = parseFloat(input.value);
        calculate(); // Perform calculation if an operator exists
        operator = buttonValue;
        firstNumber = result;
        input.value = "";
      } else {
        operator = buttonValue;
        firstNumber = parseFloat(input.value);
        input.value = "";
      }
    } else if (button.classList.contains("btn-total")) {
      // Check if the button is for calculating total
      if (operator !== "" && input.value !== "") {
        secondNumber = parseFloat(input.value);
        calculate(); // Calculate total if an operator and second number are present
      }
    }
  });
});

// Function to calculate based on the operator selected
function calculate() {
  if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
  } else if (operator === "/") {
    result = firstNumber / secondNumber;
  } else if (operator === "*") {
    result = firstNumber * secondNumber;
  } else if (operator === "%") {
    const percentage = secondNumber / 100;
    result = firstNumber * percentage;
  }

  input.value = result;
  resultsEl.innerHTML = `Answer: ${result}`;
  firstNumber = result;
  secondNumber = 0;
  operator = "";
}

// Function to clear all values
function clearAllValues() {
  input.value = "";
  resultsEl.innerHTML = "";
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  calculationPerformed = false;
}

// Function to delete only one value/handle the delete button
function handleDelete() {
  if (calculationPerformed) {
    clearAllValues(); // If calculation is already performed, clear all values
  } else {
    // Else clear last digit
    const currentValue = input.value;
    const newValue = currentValue.slice(0, -1);
    input.value = newValue;
    resultsEl.innerHTML = newValue;
  }
}

clearAll.addEventListener("click", clearAllValues);
deleteBtn.addEventListener("click", handleDelete);
