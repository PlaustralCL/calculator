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
  switch(operator) {
    case 'add':
      return add(firstNumber, secondNumber);
      break;
    case 'subtract':
      return substract(firstNumber, secondNumber);
      break;
    case 'multiply':
      return multiply(firstNumber, secondNumber);
      break;
    case 'divide':
      return divide(firstNumber, secondNumber);
      break;
    default:
      return 'unknown';

  }
}




function handleClick(event){
  if (event.target.id === 'clear') {
    clearAll();
    return;
  }
  
  if (equalsTest === true) {
    clearAll();
  }
  equalsTest = false;

  if (event.target.id.search(/[0-9]/) !== -1) {
   processNumber(event.target.id);
   return;
  } else if (event.target.id ==='equals') {
      processEquals();
      return;
  } else {
    operator = event.target.id;
    statement += ` ${event.target.id} `;
    document.querySelector('#statement').textContent = statement;
    operatorTest = true;
    return;
  }
  
  
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

function processNumber(numberId) {
  if (operatorTest === false) {
    numberA.push(parseInt(numberId));
    console.log({numberA});
    statement += numberId;
    document.querySelector('#statement').textContent = statement;
    return;
  } else {
    numberB.push(parseInt(numberId));
    console.log({numberB});
    statement += numberId;
    document.querySelector('#statement').textContent = statement;
    return;
  }
}

function processEquals() {
  console.log(typeof(parseInt(numberA.join(''))));
    const result = operate(operator,
        parseInt(numberA.join('')), parseInt(numberB.join('')));
      document.querySelector('#result').textContent = result;
      equalsTest = true;
      operatorTest = false;
      numberAns = result;
      return;
}


// const key = document.querySelectorAll('.key');
// key.forEach((button) => {
//   button.addEventListener('click', handleClick)
// });
