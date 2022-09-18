// DOM ELEMENTS
const digits = document.querySelectorAll('.digits button');
const operators = document.querySelectorAll('.operators button');
const display = document.querySelector('#display');
const dotButton = document.querySelector('#dot');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');

// CALCULATOR VARIABLES
let displayValue = 0;
let storedValue = 0;
let dotPressed = false;
let currentOperator;
let currentResult;

// CALCULATOR BUTTONS EVENT LISTENERS
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    displayValue = Number((display.textContent += e.target.textContent));
    console.log('display: ' + displayValue);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (currentResult) {
      storedValue = currentResult;
      currentResult = undefined;
    } else {
      storedValue = currentOperator
        ? operate(currentOperator, storedValue, displayValue)
        : displayValue;
    }

    currentOperator = selectOperator(e.target.id);
    dotPressed = false;
    displayValue = 0;
    display.textContent = '';

    console.log('stored: ' + storedValue);
    console.log('operator: ' + e.target.id);
  });
});

dotButton.addEventListener('click', (e) => {
  if (!dotPressed) {
    displayValue = Number((display.textContent += e.target.textContent));
    dotPressed = true;
    console.log('display: ' + displayValue);
  }
});

equalsButton.addEventListener('click', () => {
  if (currentOperator) {
    currentResult = operate(currentOperator, storedValue, displayValue);

    storedValue =
      currentResult % 1 === 0 ? currentResult : currentResult.toFixed(2);
    display.textContent = storedValue;
    displayValue = 0;

    console.log('stored: ' + storedValue);
    console.log('current result: ' + currentResult);
  }
});

clearButton.addEventListener('click', () => {
  displayValue = 0;
  storedValue = 0;
  currentOperator = undefined;
  currentResult = undefined;
  display.textContent = '';
});

// MATH FUNCTIONS
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    console.error("can't divide by zero!");
    return 'Not Today!';
  }
  return a / b;
}

function selectOperator(operator) {
  switch (operator) {
    case 'add':
      return add;
    case 'subtract':
      return subtract;
    case 'multiply':
      return multiply;
    case 'divide':
      return divide;
    default:
      console.error('operator not supported!');
  }
}

function operate(operation, a, b) {
  return operation(a, b);
}
