/** Initialize global variables */
let workingNumber = '';
let storedNumber = '';
let statement = '';
let operator = '';

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

function exponent(a, b) {
  return a ** b;
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
    case '^':
      return exponent(firstNumber, secondNumber);
      break;
    default:
      return 'unknown';
  }
}

function handleClick(event){
  console.log('handleClick');
  if (event.target.id.search(/[0-9]/) !== -1) { // deal with numbers
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
    case 'signs':
      changeSign();
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

function changeSign() {
  if (workingNumber.length === 0) {
    console.log('no sign change - return');
    return;
  }
  if (workingNumber.slice(0,1) === '-') {
    workingNumber = workingNumber.slice(1); // removes negative sign
  } else {
      workingNumber = `-${workingNumber}`; // adds negative sign
  }

  if (operator.length === 0) {
    statement = workingNumber;
  } else {
      /** the line below does not work properly for the first entry, if more than 1 digit */
      statement = statement.slice(0, statement.lastIndexOf(' ')) + ' '; //removes the old number
      statement += workingNumber; // replace with the new number, with switched sign
    }

  
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
  operator = '';
  return;
}

function clearEntry() {
  workingNumber = '';
  statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  document.querySelector('#statement').textContent = statement;
  return;
}

function processEquals() {
  // Need to have two numbers and an operator to perform a calculation
  if (storedNumber.length === 0 || workingNumber.length === 0 ||operator.length === 0) {
    return;
  }

  let  amountNegativeSigns = 0;
  /** Look for '-' that are immediately followed by a number. This would indicate
   * a negative number, not a substraction sign. If none are found then the
   * match would return null. Not null means a negative sign is present.
   */
  if (statement.match(/-(?=[0-9])/g) !== null) {
    amountNegativeSigns = statement.match(/-(?=[0-9])/g).length;
  }
  const amountOperators = statement.match(/[+-/*^]/g).length; //Number of operators present
  /**After 3rd operator is pressed, resets statement to show the immediate
   * calculation that gave the result
   */
  if (amountOperators - amountNegativeSigns >= 2) {
    statement = `(${document.querySelector('#result').textContent} ${operator} ${workingNumber})`;
  } 

  const result = operate(operator, parseFloat(storedNumber), parseFloat(workingNumber));
  document.querySelector('#result').textContent = result;
  storedNumber = result.toString();
  operator = '';
  workingNumber = '';
  return;  
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
  /** See processOperator-tables.md in the planning folder for more detail
   * on the conditions.
   */

  /** Conditon 1
   * Initial state: 0 1 0 
   * Initial operator input - after browser refresh/load or clearAll
   * storedNumber is empty
   * working number is not empty 
   * operator is empty
   */
  if (storedNumber.length === 0 && workingNumber.length !== 0 && operator.length === 0) {
    storedNumber = workingNumber;
    workingNumber = '';
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;
  }

  /** Condition 3
   * Inital state: 1 1 1
   * Stringing together operations without equals sign
   * Ready for calculation
   * needs to be treated as an equal sign --> use processEquals()
   * storedNumber is not empty
   * workingNumber is not empty
   * operator is not empty
   */
  if (storedNumber.length !== 0 && workingNumber.length !== 0 && operator.length !== 0) {
    processEquals(); // storedNumber now equals result
    operator = operatorId;
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    return;  
  }
  
  /** Conditon 4
  * Initial state: 1 0 0
  * After equals sign, workingNumber and operator have been reset
  * storedNumber is not empty (equals result of previous calculation)
  * workingNumber is empty
  * operator is empty
  */
  if (storedNumber.length !== 0 && workingNumber.length === 0 && operator.length === 0) {
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;    
  }
  
  /** Conditon 6
* Initial state: 1 1 0
* *start new calc with number after equals sign
* storedNumber is not empty (equals result of previous calculation)
* workingNumber is not empty
* operator is empty
*/
  if (storedNumber.length !== 0 && workingNumber.length !== 0 && operator.length === 0) {
    storedNumber = workingNumber;
    workingNumber = '';
    statement += ` ${operatorId} `;
    document.querySelector('#statement').textContent = statement;
    operator = operatorId;
    return;      
  }      
} // end of process operator
