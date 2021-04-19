/** Initialize global variables */
let numberA = '';
let numberB = '';
let workingNumber = '';
let storedNumber = '';

let statement = '';
let operator = '';
let numberList = /[0-9]/;

equalsTest = false;

/** Event Listeners */
document.querySelector('.buttons').addEventListener('click', handleClick);

/** Functions */

function add(a, b) {
  console.log({a});
  console.log({b});
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'ERROR';
  }
  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  console.log('operate()');
  console.log({numberStored: storedNumber});
  console.log(operator);
  switch(operator) {
    case '+':
      return add(firstNumber, secondNumber);
      break;
    case '-':
      return substract(firstNumber, secondNumber);
      break;
    case '*':
      return multiply(firstNumber, secondNumber);
      break;
    case '/':
      return divide(firstNumber, secondNumber);
      break;
    default:
      return 'unknown';
  }
}

function handleClick(event){
  console.log('handleClick');
  console.log({numberStored: storedNumber});
  if (equalsTest === true && event.target.id.search(/[0-9]/) !== -1) {
    // !== -1 means that a number was found.
    clearAll();
  }
  equalsTest = false;
  
  if (event.target.id.search(/[0-9]/) !== -1) {
    processNumber(event.target.id);
    return;
  }
  
  switch (event.target.id) {
    case 'buttons':
      return;
      break;
    case 'clear':
      clearAll();
      return;
      break;
    case 'ce':
      clearEntry();
      return;
      break;
    case 'delete':
      backspaceEntry();
      return;
      break;
    case 'equals':
      processEquals();
      return;
      break;
    case 'decimal':
      processNumber('.');
      return;
      break;
    default:
      processOperator(event.target.id);
      return;
  }
}

function backspaceEntry() {
  workingNumber = workingNumber.slice(0, workingNumber.length - 1);
  statement = statement.slice(0, statement.length - 1);
  document.querySelector('#statement').textContent = statement;
  return;
}

function clearAll() {
  console.log('clearAll');
  statement = '';
  document.querySelector('#statement').textContent = '';
  document.querySelector('#result').textContent = '';
  storedNumber = '';
  workingNumber = '';
  
  equalsTest = false;
  return;
}

function clearEntry() {
  workingNumber = '';
  statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  document.querySelector('#statement').textContent = statement;
  return;
}

function processEquals() {
  if (operator.length === 0) {
    return;
  }
  const result = operate(operator, parseFloat(storedNumber), parseFloat(workingNumber));
  document.querySelector('#result').textContent = result;
  storedNumber = result.toString();
  operator = '';
  workingNumber = '';
  return;  
  // equalsTest = true;
}

function processNumber(numberId) {
  //Reset the displays if a new calculation is started after an equals sign
  if (storedNumber.length !== 0 && workingNumber.length === 0 && operator.length === 0) {
    statement = '';
    document.querySelector('#statement').textContent = statement;
    document.querySelector('#result').textContent = '';
  }
  workingNumber += numberId;
  statement += numberId;
  document.querySelector('#statement').textContent = statement;
  return;
}

function processOperator(operatorId) {
  console.log(storedNumber, workingNumber, operator);
  if (storedNumber.length === 0 && workingNumber.length !== 0 && operator.length === 0) {
    storedNumber = workingNumber;
    workingNumber = '';
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;
  }

  if (storedNumber.length !== 0 && workingNumber.length !== 0 && operator.length !== 0) {
    const result = operate(operator, parseFloat(storedNumber), parseFloat(workingNumber));
    storedNumber = result.toString();
    document.querySelector('#result').textContent = result;
    workingNumber = ''
    operator = operatorId;
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    return;  
  }
  
  if (storedNumber.length !== 0 && workingNumber.length === 0 && operator.length === 0) {
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;    
  }
  
  if (storedNumber.length !== 0 && workingNumber.length !== 0 && operator.length === 0) {
    storedNumber = workingNumber;
    workingNumber = '';
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;      
  }      
} // end of process operator
