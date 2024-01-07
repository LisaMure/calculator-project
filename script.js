const buttons = document.querySelectorAll("button");
const input = document.getElementById("input-form");
const operators = document.querySelectorAll(".btn-operator");
const resultsEl = document.getElementById("results");
const clearAll = document.getElementById("clear-all");
const deleteBtn = document.getElementById("delete-btn");
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let storedOperator = "";
let calculationPerformed = false;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;
    let inputValue = input.value + buttonValue;
    resultsEl.innerHTML = inputValue;

    if (!isNaN(buttonValue) || buttonValue === ".") {
      input.value += buttonValue;
      if (storedOperator === "") {
        firstNumber = parseFloat(input.value);
      } else {
        secondNumber = parseFloat(input.value);
      }
    } else if (button.classList.contains("btn-operator")) {
      storedOperator = buttonValue;
      input.value = "";
    } else if (button.classList.contains("btn-total")) {
      calculate();
      calculationPerformed = true;
    }
  });
});

function calculate() {
  input.value = "";
  if (storedOperator === "+") {
    result = firstNumber + secondNumber;
  } else if (storedOperator === "-") {
    result = firstNumber - secondNumber;
  } else if (storedOperator === "/") {
    result = firstNumber / secondNumber;
  } else if (storedOperator === "*") {
    result = firstNumber * secondNumber;
  } else if (storedOperator === "%") {
    const percentage = secondNumber / 100;
    result = firstNumber * percentage;
  }

  input.value = result;
  resultsEl.innerHTML = `${firstNumber} ${storedOperator} ${secondNumber} = ${result}`;
  firstNumber = result;
  secondNumber = 0;
  storedOperator = "";
}

function clearAllValues() {
  input.value = "";
  resultsEl.innerHTML = "";
  firstNumber = 0;
  secondNumber = 0;
  storedOperator = "";
  calculationPerformed = false;
}

function handleDelete() {
  if (calculationPerformed) {
    clearAllValues();
  } else {
    const currentValue = input.value;
    const newValue = currentValue.slice(0, -1);
    input.value = newValue;
    resultsEl.innerHTML = newValue;
  }
}

clearAll.addEventListener("click", clearAllValues);
deleteBtn.addEventListener("click", handleDelete);
