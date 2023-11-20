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
const firstNum = 0;
const operator = '+';
const secondNum = 0;

// Functionality of Calculator
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
