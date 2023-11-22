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
    // Check if a number has been entered before allowing the addition of a decimal point
    if (firstNumber === '' && number === '.') {
      return;
    }

    // Check if there is already a decimal point in the first number
    if (number !== '.' || (number === '.' && !firstNumber.includes('.'))) {
      firstNumber += number;
      updateDisplay(firstNumber);
    }
  } else {
    // Check if the second number is empty before allowing the addition of a decimal point
    if (secondNumber === '' && number === '.') {
      return;
    }

    // Check if there is already a decimal point in the second number
    if (number !== '.' || (number === '.' && !secondNumber.includes('.'))) {
      secondNumber += number;
      updateDisplay(secondNumber);
    }
  }
}



// Select the decimal button using its id
const decimalButton = document.getElementById('decimal');

// Add an event listener to the decimal button
decimalButton.addEventListener('click', () => handleNumberClick('.'));


// Function to handle operator button clicks
function handleOperatorClick(selectedOperator) {
  if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    updateDisplay(result);

    // Reset the calculator values for the next operation
    firstNumber = result.toString();
    operator = '';
    secondNumber = '';
  }

  // Set the new operator
  operator = selectedOperator;
  updateDisplay(operator);
}

// Function to handle "=" button click
function handleEqualClick() {
  if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
    const num2 = parseFloat(secondNumber);

    // Check if attempting to divide by zero
    if (operator === '/' && num2 === 0) {
      // Display a snarky error message
      alert("Nice try! You can't divide by zero.");
      clearCalculator(); // Reset the calculator after the error message
    } else {
      const result = operate(operator, parseFloat(firstNumber), num2);

      // Check if the result is a valid number
      if (!isNaN(result) && isFinite(result)) {
        // Round the result to a certain number of decimal places (e.g., 2 decimal places)
        const roundedResult = result.toFixed(2);

        updateDisplay(roundedResult);

        // Reset the calculator values for the next operation
        firstNumber = roundedResult.toString();
        operator = '';
        secondNumber = '';
      } else {
        // Display a snarky error message for other calculation errors
        alert("Oops! Something went wrong with the calculation.");
        clearCalculator(); // Reset the calculator after the error message
      }
    }
  } else {
    // Handle the case where not all necessary values are present
    alert('Please enter numbers and an operator before pressing "=".');
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

// Select the clear button using its class
const clearButton = document.querySelector('.action-btn');

// Add an event listener to the clear button
clearButton.addEventListener('click', clearCalculator);

// Select the delete button using its class
const deleteButton = document.querySelector('.action-btn:last-child');

// Add an event listener to the delete button
deleteButton.addEventListener('click', handleDeleteClick);


// Function to handle "Delete" button click
function handleDeleteClick() {
  // Check if there is a second number, and delete the last character from it
  if (secondNumber !== '') {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber);
  } else if (operator !== '') {
    // If there is an operator but no second number, remove the operator
    operator = '';
    updateDisplay(firstNumber);
  } else if (firstNumber !== '') {
    // If there is a first number but no operator or second number, remove the last character
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber);
  }
}
