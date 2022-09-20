// DOM ELEMENTS
const digits = document.querySelectorAll('.digits button');
const operators = document.querySelectorAll('.operators button');
const display = document.querySelector('#display');
const formula = document.querySelector('#formula');
const dotButton = document.querySelector('#dot');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

// CALCULATOR VARIABLES
let displayValue = 0;
let storedValue = 0;
let dotPressed = false;
let currentOperator;
let currentResult;

// CALCULATOR BUTTONS EVENT LISTENERS
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    formula.textContent += e.target.textContent;
    displayValue = Number((display.textContent += e.target.textContent));
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (currentResult) {
      formula.textContent = currentResult;
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

    formula.textContent += ' ' + e.target.textContent + ' ';
    display.textContent = '';
  });
});

dotButton.addEventListener('click', (e) => {
  if (!dotPressed) {
    formula.textContent += e.target.textContent;
    displayValue = Number((display.textContent += e.target.textContent));
    dotPressed = true;
  }
});

equalsButton.addEventListener('click', () => {
  if (currentOperator) {
    currentResult = operate(currentOperator, storedValue, displayValue);
    storedValue =
      currentResult % 1 === 0 ? currentResult : currentResult.toFixed(2);
    formula.textContent = '';
    display.textContent = storedValue;
    displayValue = 0;
  }
});

clearButton.addEventListener('click', () => {
  displayValue = 0;
  storedValue = 0;
  dotPressed = false;
  currentOperator = undefined;
  currentResult = undefined;
  formula.textContent = '';
  display.textContent = '';
});

backspaceButton.addEventListener('click', () => {
  if (formula.textContent[formula.textContent.length - 1] !== ' ') {
    formula.textContent = formula.textContent.slice(0, -1);
  }
  displayValue = Number(
    (display.textContent = display.textContent.slice(0, -1))
  );
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
