/** Initialize global variables */
let numberA = '';
let numberB = '';
let numberWorking = '';
let numberStored = '';

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
  console.log({numberStored});
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
  console.log({numberStored});
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
  numberWorking = numberWorking.slice(0, numberWorking.length - 1);
  statement = statement.slice(0, statement.length - 1);
  document.querySelector('#statement').textContent = statement;
  return;
}

function clearAll() {
  console.log('clearAll');
  statement = '';
  document.querySelector('#statement').textContent = '';
  document.querySelector('#result').textContent = '';
  numberStored = '';
  numberWorking = '';
  
  equalsTest = false;
  return;
}

function clearEntry() {
  numberWorking = '';
  statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  document.querySelector('#statement').textContent = statement;
  return;
}

function processEquals() {
  console.log('processEquals');
  console.log({numberStored});
  if(numberStored.length === 0 || numberWorking.length === 0) {
    console.log('processEquals - unnecessary equal usage');
    console.log({numberStored});
    
    console.log({numberWorking});
    console.log('equals 0');
    return;
  }

  const result = operate(operator, parseFloat(numberStored), parseFloat(numberWorking));
  document.querySelector('#result').textContent = result;
  numberStored = result.toString();
  //reset global variables
  equalsTest = true;
  
  console.log({numberStored});
  numberWorking = '';
  operator = '';
  return;
}

function processNumber(numberId) {
  
  numberWorking += numberId;
  statement += numberId;
  document.querySelector('#statement').textContent = statement;
  return;
}

function processOperator(operatorId) {
  console.log(`operator length = ${operator.length}`);
  // if (operator.length !== 0) { 
  //   //inadvertent impact of preventing stringing together operations
  //   return; // returns if an operator has already been pressed
  // }
  
  statement += ` ${operatorId} `;
  document.querySelector('#statement').textContent = statement;
  
  //Checks for first press of an operator and then moves the working number
  // to the stored number. This is only applicable for the first calculation
  // or after clear all.
  if (operator.length === 0 && numberStored.length === 0) {
    console.log('this here');
    numberStored = numberWorking; 
    numberWorking = '';
    
    operator = operatorId; // used for processEquals funcntion
    return;
  }

  //For first operator after the equals sign has been pressed.
  if (operator.length === 0) {
    operator = operatorId;
   
    return;
  }
  if (numberStored.length !== 0 && numberWorking.length !== 0 && operator.length !== 0) { // all three parts are needed for a calculation
    const result = operate(operator, parseInt(numberStored), parseInt(numberWorking)); // calculate the result
    document.querySelector('#result').textContent = result; // update screen with result
    numberStored = result.toString();
    numberWorking = '';
    operator = '';
    return;
  }
  
  
  
  return;
} // end of process operator
