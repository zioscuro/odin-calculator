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
let operatorPressed = false;
let currentOperator;
let currentResult;

// CALCULATOR OPERATIONS FUNCTIONS
const pushDigit = function pushDigitOnCalculator(num) {
  formula.textContent += num;
  displayValue = Number((display.textContent += num));
  operatorPressed = false;
};

const pushOperator = function pushOperatorOnCalculator(opr) {
  if (!operatorPressed) {
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
    formula.textContent === ''
      ? (formula.textContent = `0 ${opr} `)
      : (formula.textContent += ` ${opr} `);
    display.textContent = '';
    dotPressed = false;
    operatorPressed = true;
  }
};

const pushDot = function pushDotOnCalculator() {
  if (!dotPressed) {
    formula.textContent.slice(-1) == ' '
      ? (formula.textContent += '0.')
      : (formula.textContent += '.');
    displayValue = Number(
      display.textContent == ''
        ? (display.textContent = '0.')
        : (display.textContent += '.')
    );
    dotPressed = true;
    operatorPressed = false;
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
    currentOperator = undefined;
  }
};

const pushClear = function pushClearOnCalculator() {
  displayValue = 0;
  storedValue = 0;
  dotPressed = false;
  operatorPressed = false;
  currentOperator = undefined;
  currentResult = undefined;
  formula.textContent = '';
  display.textContent = '';
};

const pushBackspace = function pushBackspaceOnCalculator() {
  if (formula.textContent.slice(-1) !== ' ')
    formula.textContent = formula.textContent.slice(0, -1);

  displayValue = Number(
    (display.textContent = display.textContent.slice(0, -1))
  );
};

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
});

clearButton.addEventListener('click', () => {
  pushClear();
});

backspaceButton.addEventListener('click', () => {
  pushBackspace();
});

// KEYBOARD EVENT LISTENER
window.addEventListener('keydown', (e) => {
  const pressedKey = e.key;
  const digitKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operatorKeys = ['+', '-', '*', '/'];

  if (digitKeys.indexOf(pressedKey) !== -1) {
    pushDigit(pressedKey)
  } else if (operatorKeys.indexOf(pressedKey) !== -1) {
    pushOperator(pressedKey)
  } else {
    switch (pressedKey) {
      case '.':
        pushDot();
        break;
      case 'Enter':
        pushEquals();
        break;
      case 'Delete':
        pushClear();
        break;
      case 'Backspace':
        pushBackspace();
        break;
    }
  }
});
