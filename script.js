/** Initialize global variables */
let numberA = [];
let numberB = [];
let numberAns = [];
let statement = '';
let operator = '';
let numberList = /[0-9]/;
let operatorTest = false;
equalsTest = false;

/** Event Listeners */
document.querySelector('.buttons').addEventListener('click', handleClick);

/** Functions */

function add(a, b) {
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
  if (equalsTest === true && event.target.id.search(/[0-9]/) !== -1) {
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
  if (operatorTest === false) {
    numberA.pop();
  } else {
    numberB.pop();
  }
  statement = statement.slice(0, statement.length - 1);
  document.querySelector('#statement').textContent = statement;
  return;
}

function clearAll() {
  statement = '';
  document.querySelector('#statement').textContent = '';
  document.querySelector('#result').textContent = '';
  numberA = [];
  numberB = [];
  operatorTest = false;
  equalsTest = false;
  return;
}

function clearEntry() {
  if (operatorTest === false) {
    numberA = [];
    statement = '';
  } else {
    numberB = [];
    statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  }
  document.querySelector('#statement').textContent = statement;
  return;
}

function processEquals() {
  if(numberA.length === 0 || numberB.length === 0) {
    return;
  }

  const result = operate(operator,
      parseFloat(numberA.join('')), parseFloat(numberB.join('')));
    document.querySelector('#result').textContent = result;
    equalsTest = true;
    operatorTest = false;
    numberA = Array.from(String(result));
    numberB = [];
    return;
}

function processNumber(numberId) {
  if (operatorTest === false) {
    numberA.push(numberId);
    console.log({numberA});
    statement += numberId;
    document.querySelector('#statement').textContent = statement;
    return;
  } else {
      numberB.push(numberId);
      console.log({numberB});
      statement += numberId;
      document.querySelector('#statement').textContent = statement;
      return;
  }
}

function processOperator(operatorId) {
  statement += ` ${operatorId} `;
  document.querySelector('#statement').textContent = statement;
  if (operatorTest === false) {
    operatorTest = true;
    operator = operatorId; // used for processEquals funcntion
    return;
  }
  const result = operate(operator, parseInt(numberA.join('')), parseInt(numberB.join('')));
  document.querySelector('#result').textContent = result;
  operator = operatorId; // sets operator for next operation
  numberA = Array.from(String(result));
  console.log(typeof numberA);
  numberB = [];
  operatorTest = true;
  return;
}



// const key = document.querySelectorAll('.key');
// key.forEach((button) => {
//   button.addEventListener('click', handleClick)
// });
