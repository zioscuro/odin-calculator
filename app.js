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
  return a / b;
}

function operate(operation, a, b) {
  return operation(a, b);
}

// DOM ELEMENTS
const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digits button');

// CALCULATOR VARIABLES
let displayValue = 0;

// CALCULATOR BUTTONS EVENT LISTENERS
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    displayValue = parseInt(display.textContent += e.target.textContent);
    console.log(displayValue);
  });
});
