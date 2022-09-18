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
    console.error('can\'t divide by zero!');
    return 'Not Today!';
  }
  return a / b;
}

function selectOperator(operator) {
  switch (operator) {
    case 'add': return add;
    case 'subtract': return subtract;
    case 'multiply': return multiply;
    case 'divide': return divide;
    default: console.error('operator not supported!');
  }
}

function operate(operation, a, b) {
  return operation(a, b);
}

// DOM ELEMENTS
const digits = document.querySelectorAll('.digits button');
const operators = document.querySelectorAll('.operators button');
const display = document.querySelector('#display');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');

// CALCULATOR VARIABLES
let displayValue = 0;
let storedValue = 0;
let currentOperator;
let currentResult;

// CALCULATOR BUTTONS EVENT LISTENERS
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    displayValue = parseInt(display.textContent += e.target.textContent);
    console.log('display: ' + displayValue);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    storedValue = displayValue;    
    displayValue = 0;
    display.textContent = '';
    currentOperator = e.target.id;
    console.log('stored: ' + storedValue);
    console.log('operator: ' + currentOperator);
  });
});

equalsButton.addEventListener('click', (e) => { 
  currentResult = operate(selectOperator(currentOperator), storedValue, displayValue);

  display.textContent = currentResult;
  displayValue = 0;
 
  console.log('current result: ' + currentResult);
});

clearButton.addEventListener('click', () => {
  displayValue = 0;
  storedValue = 0;
  currentOperator = undefined;
  currentResult = undefined;
  display.textContent = '';
});