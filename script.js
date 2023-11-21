// Math Operators
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

// Variables for Calculator Operations
let firstNumber = '';
let operator = '';
let secondNumber = '';

// Select buttons using the class .num-btn
const buttons = document.querySelectorAll('.num-btn');

// Function to update the display
function updateDisplay(value) {
  const displayElement = document.getElementById('display');
  displayElement.textContent = value;
}

// Function to handle number button clicks
function handleNumberClick(number) {
  if (operator === '') {
    firstNumber += number;
    updateDisplay(firstNumber);
  } else {
    secondNumber += number;
    updateDisplay(secondNumber);
  }
}

// Function to handle operator button clicks
function handleOperatorClick(selectedOperator) {
  operator = selectedOperator;
  updateDisplay(operator);
}

// Function to handle "=" button click
function handleEqualClick() {
  if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    updateDisplay(result);

    // Reset the calculator values for the next operation
    firstNumber = result.toString();
    operator = '';
    secondNumber = '';
  }
}

// Function to check if a value is a number
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Function to check if a value is an operator
function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

// Calculator Display
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener('click', () => {
    if (isNumber(button.innerHTML)) {
      handleNumberClick(button.innerHTML);
    } else if (isOperator(button.innerHTML)) {
      handleOperatorClick(button.innerHTML);
    } else if (button.innerHTML === '=') {
      handleEqualClick();
    }
  });
}

// Function to perform the calculation
function operate(operator, num1, num2) {
  const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
  };

  const operation = operators[operator];

  if (operation) {
    return operation(num1, num2);
  } else {
    return 'Invalid operator';
  }
}

// Reset the calculator values
function clearCalculator() {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  updateDisplay('');
}
