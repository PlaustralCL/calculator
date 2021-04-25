/** Initialize global variables */
let workingNumber = '';
let storedNumber = '';
let statement = ''; //string tracking display of problem statement
let resultDisplay = '' //string tracking display of the result
let operator = '';

/** Event Listeners */
document.querySelector('.buttons').addEventListener('click', handleClick);
document.querySelector('#modal__exit').addEventListener('click', handleClick);;
document.addEventListener('keydown', handleKeyboard);

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

function findCalculation(operator, firstNumber, secondNumber) {
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

function directListnerEvent(eventId){
  console.log(`${typeof eventId}`);
  if (eventId.search(/[0-9]/) !== -1) { // deal with numbers
    processNumberButton(eventId);
    return;
  }
  
  switch (eventId) {
    case 'buttons':
      break;
    case 'ce':
      clearEntry();
      break;
    case 'Escape':
      clearAll();
      break;
    case 'decimal':
      processNumberButton('.');
      break;
    case 'Backspace':
      backspaceButton();
      break;
    case 'Enter':
      processEqualsButton();
      break;
    case 'invert':
      invertNumber();
      break;
    case 'modal__exit':
      closeModal();
      break;
    case 'signs':
      changeSign();
      break;
    case 'sqrt':
      squareOrRootNumber(.5);
      break
    case 'squared':
      squareOrRootNumber(2);
      break
    default:
      processOperatorButton(eventId);
  }
  
  return;
}

function handleClick(event) {
  directListnerEvent(event.target.id);
}

function handleKeyboard(event) {
  console.log(`${event.key}`);
  let eventId = event.key;
  if (eventId === '.'){
    
    eventId = 'decimal';
    
  }

  directListnerEvent(eventId);
}

function backspaceButton() {
  /**Only allow backspace for working number */
  if (workingNumber === '') {
    return;
  }
  workingNumber = workingNumber.slice(0, workingNumber.length - 1);
  statement = statement.slice(0, statement.length - 1);
  updateDisplay(statement, resultDisplay);
  
  return;
}

function changeSign() {
  if (workingNumber === '' && document.querySelector('#result').textContent !== '') {
    workingNumber = document.querySelector('#result').textContent;
    statement = '';
    resultDisplay = '';
    updateDisplay();
  } else if (workingNumber.length === 0) { // nothing to change
       console.log('no sign change - return');
      return;
    }
  if (workingNumber.slice(0,1) === '-') { // Negative number - already has a negative sign
    workingNumber = workingNumber.slice(1); // removes negative sign
  } else { // positive number
      workingNumber = `-${workingNumber}`; // adds negative sign
  }

  if (operator.length === 0) {
    statement = workingNumber;
  } else {
      /** the line below does not work properly for the first entry, if more than 1 digit */
      statement = statement.slice(0, statement.lastIndexOf(' ')) + ' '; //removes the old number
      statement += workingNumber; // replace with the new number, with switched sign
    }
  updateDisplay(statement, resultDisplay);
  return;
}

function clearAll() {
  console.log('clearAll');
  statement = '';
  resultDisplay = '';
  updateDisplay(statement, resultDisplay);
  storedNumber = '';
  workingNumber = '';
  operator = '';
  return;
}

function clearEntry() {
  workingNumber = '';
  /** different treatement needed if the statement display has spaces or not */
  if (statement.search(/\s/) === -1) { //no spaces === true
    statement = '';
  } else {
    // Looks for the last space charter and slices from there to the end
    statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  }

  updateDisplay(statement, resultDisplay);
  return;
}

function closeModal() {
  document.querySelector('#modal').style.display = 'none';
}

function filterKeyboard(operatorId) {
  if (operatorId.match(/[+\-/*^]/g) === null){
    console.log('no operator');
    return false;
  }
  console.log('is operator');
  return true;
}


function invertNumber() {
  /**Allow the result (workingNumber) to be inverted and used in the next calculation
  * but not if it is a 0 or empty.
  */
  if (workingNumber === '' &&
      document.querySelector('#result').textContent !== '' &&
      document.querySelector('#result').textContent !== '0') {
    workingNumber = document.querySelector('#result').textContent;
    statement = '';
    resultDisplay = '';
    updateDisplay();
  }

  //Don't invert a non number or 0
  if (workingNumber === '' || parseFloat(workingNumber) === 0 ) {
    console.log('invert return');
    return;
  }

  console.log('test');
  workingNumber = 1 / parseFloat(workingNumber);

  workingNumber = workingNumber.toString();

  /** different treatment required if spaces are present */
  if (statement.search(/\s/) === -1) { // No spaces present = true
    statement = limitDecimalPlaces(workingNumber, 3);
  } else {
      
      statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ' +
          limitDecimalPlaces(workingNumber, 3);
  }

  updateDisplay(statement, resultDisplay);
}

function launchModal() {
  console.log('launchModal');
  document.querySelector('#modal').style.display = 'flex';
}

function launchToast() {
  document.querySelector('#excessDigits').classList.add('toast--show');
  setTimeout(() => document.querySelector('#excessDigits').classList.remove('toast--show'), 3000);
}

/**
 * Evaluates a number, passed as a string. If the number has more than three
 * digits after the decimal, returns a string with no more than 3 digits after
 * the decimal.
 * @param {string} number - a number as a string
 * @param {umber} digits - the number of digits after the decimal to show
 * @returns {string} - number as string with no more than three decimal places
 */
function limitDecimalPlaces(number, digits) {
  // return number if no decimal places
  if (parseFloat(number) % 1 === 0) {
    return number;
  }
  
  const decimalPlaces = number.match(/\.(\d+)/)[1].length;
  if (decimalPlaces >= 4) {
    return parseFloat(number).toFixed(digits).toString();
  }

  return number;
}

function processEqualsButton() {
  // Need to have two numbers and an operator to perform a calculation
  if (storedNumber.length === 0 || workingNumber.length === 0 ||operator.length === 0) {
    return;
  }

  let  amountNegativeSigns = 0;

  /** Look for `-` that are immediately followed by a number. This would indicate
   * a negative number, not a substraction sign. If none are found then the
   * match would return null. Not null means a negative sign is present.
   */
  if (statement.match(/-(?=[0-9])/g) !== null) {
    amountNegativeSigns = statement.match(/-(?=[0-9])/g).length;
  }

  /**Look for `-` that are immediately followed by decimals, indicating a
   * negative decimal number.
  */
 if (statement.match(/-(?=\.)/g) !== null) { // not null means a negative decimal is present
  amountNegativeSigns += statement.match(/-(?=\.)/g).length;
 }
 
  const amountOperators = statement.match(/[+\-/*^]/g).length; //Number of operators present
  
  /**After 3rd operator is pressed, resets statement to show the immediate
   * calculation that gave the result, adding parentheses in the statement.
   * This limits the size of the statement section to a reasonable amount
   * while still showing the immediate calculation that caused the displayed 
   * answer.
   */
  if (amountOperators - amountNegativeSigns >= 2) {
    console.log('line 276');
    const resultContent = document.querySelector('#result').textContent
    statement = `(${limitDecimalPlaces(resultContent, 3)} ${operator} ${limitDecimalPlaces(workingNumber, 3)})`;
  } 

  const result = findCalculation(operator, parseFloat(storedNumber), parseFloat(workingNumber));
 
  if (result === 'ERROR') {
    launchModal();
    storedNumber = '';
    statement = '';
    resultDisplay = '';
  } else {
    resultDisplay = limitDecimalPlaces(result.toString(), 10);
    storedNumber = result.toString();
  }
  
  updateDisplay(statement, resultDisplay);
  
  operator = '';
  workingNumber = '';
  return;  
}

function processNumberButton(numberId) {
  //prevent multiple decimals
  if (numberId === '.' && workingNumber.match(/\./g) !== null) { 
    return;
  }
  //Reset the displays if a new calculation is started after an equals sign
  if (storedNumber.length !== 0 && workingNumber.length === 0 && operator.length === 0) {
    statement = '';
    resultDisplay = '';
    updateDisplay(statement, resultDisplay);
  }

  /**Limit the size of the working number to 10 digits
   * The first check is an arbitray number greater than 1 and less than 10.
   * It has to be greater than 0 to avoid problems with decimals
  */
  if(workingNumber.length > 7 && workingNumber.match(/[0-9]/g).length >= 10) {
    launchToast();
    return;
  }

  workingNumber += numberId;
  statement += numberId;
  updateDisplay(statement, resultDisplay);
  return;
}

function processOperatorButton(operatorId) {
  if (filterKeyboard(operatorId) === false) {
    return;
  }
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
    updateDisplay(statement, resultDisplay);
    
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
    processEqualsButton(); // storedNumber now equals result
    operator = operatorId;
    statement += ` ${operatorId} `;
    updateDisplay(statement, resultDisplay);
    
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
    updateDisplay(statement, resultDisplay);
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
    updateDisplay(statement, resultDisplay);
    operator = operatorId;
    return;      
  }      
} // end of process operator

function squareOrRootNumber(exponent) {
    /**Allow the result (workingNumber) to be squared and used in the next calculation
  * but not if it is empty.
  */
  const resultNumber = document.querySelector('#result').textContent;

  /**Don't try to take the square root of a negative number */
  if (exponent === .5 && (workingNumber < 0 || parseFloat(resultNumber) < 0)) {
    return;
  }

  if (workingNumber === '' && resultNumber !== '') {
   workingNumber = resultNumber;
   statement = '';
   resultDisplay = '';
   updateDisplay();
 }

 //Don't square a non number. Needed when calculator first loads
 if (workingNumber === '') {
   console.log('invert return');
   return;
 }

 console.log('test');
 workingNumber = parseFloat(workingNumber) ** exponent;
 workingNumber = workingNumber.toString();

 /** different treatment required if spaces are present */
 if (statement.search(/\s/) === -1) { // No spaces present = true
   statement = limitDecimalPlaces(workingNumber, 3);
 } else {
     statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ' +
        limitDecimalPlaces(workingNumber, 3);
 }

 updateDisplay(statement, resultDisplay);
}


function updateDisplay(statement, resultDisplay) {
  document.querySelector('#statement').textContent = statement;
  document.querySelector('#result').textContent = resultDisplay;
}
