// DOM ELEMENTS
const digits = document.querySelectorAll('.key.digit');
const operators = document.querySelectorAll('.key.operator');
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
    pushDigit(e.target.textContent);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    pushOperator(e.target.textContent);
  });
});

dotButton.addEventListener('click', () => {
  pushDot();
});

equalsButton.addEventListener('click', () => {
  pushEquals();
  // if (currentOperator) {
  //   currentResult = operate(currentOperator, storedValue, displayValue);
  //   storedValue =
  //     currentResult % 1 === 0 ? currentResult : currentResult.toFixed(2);
  //   formula.textContent = '';
  //   display.textContent = storedValue;
  //   displayValue = 0;
  // }
});

clearButton.addEventListener('click', () => {
  pushClear();
  // displayValue = 0;
  // storedValue = 0;
  // dotPressed = false;
  // currentOperator = undefined;
  // currentResult = undefined;
  // formula.textContent = '';
  // display.textContent = '';
});

backspaceButton.addEventListener('click', () => {
  pushBackspace();
});

// KEYBOARD EVENT LISTENER
const digitKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorKeys = ['+', '-', '*', '/'];
const dotKey = '.';
const equalsKey = 'Enter';
const clearKey = 'Delete';
const backspaceKey = 'Backspace';

window.addEventListener('keydown', (e) => {
  const pressedKey = e.key;

  if (digitKeys.indexOf(pressedKey) != -1) pushDigit(pressedKey);
  if (operatorKeys.indexOf(pressedKey) != -1) pushOperator(pressedKey);
  if (pressedKey === dotKey) pushDot();
  if (pressedKey === equalsKey) pushEquals();
  if (pressedKey === clearKey) pushClear();
  if (pressedKey === backspaceKey) pushBackspace();
});

// CALCULATOR OPERATIONS FUNCTIONS
const pushDigit = function pushDigitOnCalculator(num) {
  formula.textContent += num;
  displayValue = Number((display.textContent += num));
};

const pushOperator = function pushOperatorOnCalculator(opr) {
  if (currentResult) {
    formula.textContent = currentResult;
    storedValue = currentResult;
    currentResult = undefined;
  } else {
    storedValue = currentOperator
      ? operate(currentOperator, storedValue, displayValue)
      : displayValue;
  }
  currentOperator = selectOperator(opr);
  dotPressed = false;
  displayValue = 0;

  formula.textContent += ' ' + opr + ' ';
  display.textContent = '';
};

const pushDot = function pushDotOnCalculator() {
  if (!dotPressed) {
    formula.textContent += '.';
    displayValue = Number((display.textContent += '.'));
    dotPressed = true;
  }
};

const pushEquals = function pushEqualsOnCalculator() {
  if (currentOperator) {
    currentResult = operate(currentOperator, storedValue, displayValue);
    storedValue =
      currentResult % 1 === 0 ? currentResult : currentResult.toFixed(2);
    formula.textContent = '';
    display.textContent = storedValue;
    displayValue = 0;
  }
};

const pushClear = function pushClearOnCalculator() {
  displayValue = 0;
  storedValue = 0;
  dotPressed = false;
  currentOperator = undefined;
  currentResult = undefined;
  formula.textContent = '';
  display.textContent = '';
};

const pushBackspace = function pushBackspaceOnCalculator() {
  if (formula.textContent[formula.textContent.length - 1] !== ' ') {
    formula.textContent = formula.textContent.slice(0, -1);
  }
  displayValue = Number(
    (display.textContent = display.textContent.slice(0, -1))
  );
};

// MATH FUNCTIONS
const add = function addTwoNumbers(a, b) {
  return a + b;
};

const subtract = function subtractNumBfromNumA(a, b) {
  return a - b;
};

const multiply = function multiplyTwoNumbers(a, b) {
  return a * b;
};

const divide = function divideNumAbyNumB(a, b) {
  if (b == 0) {
    console.error("can't divide by zero!");
    return 'Not Today!';
  }
  return a / b;
};

const selectOperator = function selectOperatorFromString(operator) {
  switch (operator) {
    case '+':
      return add;
    case '-':
      return subtract;
    case '*':
      return multiply;
    case '/':
      return divide;
    default:
      console.error('operator not supported!');
  }
};

const operate = function performMathOperation(operation, a, b) {
  return operation(a, b);
};
