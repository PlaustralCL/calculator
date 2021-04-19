/** Initialize global variables */
let numberA = '';
let numberB = '';
let numberWorking = '';
let numberStored = '';

let statement = '';
let operator = '';
let numberList = /[0-9]/;
let operatorTest = false;
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

  // if (operatorTest === false) {
  //   numberA = numberA.slice(0, numberA.length - 1);
  // } else {
  //   numberB = numberB.slice(0, numberA.length - 1);
  // }
  // statement = statement.slice(0, statement.length - 1);
  // document.querySelector('#statement').textContent = statement;
  // return;
}

function clearAll() {
  console.log('clearAll');
  statement = '';
  document.querySelector('#statement').textContent = '';
  document.querySelector('#result').textContent = '';
  numberStored = '';
  numberWorking = '';
  operatorTest = false;
  equalsTest = false;
  return;
}

function clearEntry() {
  numberWorking = '';
  statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  document.querySelector('#statement').textContent = statement;
  return;

  // if (operatorTest === false) {
  //   numberA = '';
  //   statement = '';
  // } else {
  //   numberB = '';
  //   statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  // }
  // document.querySelector('#statement').textContent = statement;
  // return;
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
  equalsTest = true;
  operatorTest = false;
  numberStored = result.toString();
  console.log({numberStored});
  numberWorking = '';
  return;
}

function processNumber(numberId) {
  console.log('processNumber');
  console.log({numberStored});
  numberWorking += numberId;
  statement += numberId;
  document.querySelector('#statement').textContent = statement;
  return;
  
  
  // if (operatorTest === false) {
  //   numberA += numberId;
    
  //   console.log({numberA});
  //   statement += numberId;
  //   document.querySelector('#statement').textContent = statement;
  //   return;
  // } else {
  //     numberB += numberId;  
  //     console.log({numberB});
  //     statement += numberId;
  //     document.querySelector('#statement').textContent = statement;
  //     return;
  // }
}

function processOperator(operatorId) {
 
 
  statement += ` ${operatorId} `;
  document.querySelector('#statement').textContent = statement;
  
  if (operatorTest === false && numberStored.length === 0) {
    numberStored = numberWorking; //problem
    
    numberWorking = ''; //problem
    
    operatorTest = true;
    operator = operatorId; // used for processEquals funcntion
    return;
  }

  if (operatorTest === false) {
    operator = operatorId;
    operatorTest = true;
    return;

  }


  const result = operate(operator, parseInt(numberStored), parseInt(numberWorking));
  document.querySelector('#result').textContent = result;
  operator = operatorId; // sets operator for next operation
  numberStored = result.toString();
  console.log(typeof numberStored);
  numberWorking = '';
  operatorTest = true;
  return;
}



// const key = document.querySelectorAll('.key');
// key.forEach((button) => {
//   button.addEventListener('click', handleClick)
// });
