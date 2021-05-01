/** Initialize global variables */
let workingNumber = '';
let storedNumber = '';
let statement = ''; //string tracking display of problem statement
let resultDisplay = '' //string tracking display of the result
let operator = '';

/** Event Listeners */
document.querySelector('.buttons').addEventListener('click', handleClick);
document.querySelector('#modal__exit').addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);

/** Functions */

function add(a, b) {
  console.log(typeof a);
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

/**
 * Determines which arirthmetic function is needed based on the operator.
 * The number parameters were converted from strings to numbers in the 
 * processEqualsButton function.
 * @param {string} operator 
 * @param {number} firstNumber 
 * @param {number} secondNumber 
 * @returns 
 */
function findCalculation(operator, firstNumber, secondNumber) {
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

/**
 * Calls the proper function based on what key was pressed or button clicked.
 * Receives the eventId from handleClick or handleKeyboard functions.
 * @param {string} eventId 
 */
function directListnerEvent(eventId){
  if (eventId.search(/[0-9]/) !== -1) { // deal with numbers
    processNumberButton(eventId);
    return;
  }
  
  //Everything that is not a number
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

/**
 * Receives teh event from the click eventListener and parses out the proper Id
 * before passing it to the directListnerEvent function.
 * @param {string} event 
 */
function handleClick(event) {
  document.querySelector('#focusButton').focus();
  /**The icons used on the buttons don't have the proper id, but they all have
   * the same class, 'fas'. This assigns the parent id if the class is fas.
   */
  if (event.target.classList[0] === 'fas') {
    targetId = event.target.parentNode.id;
  } else {
      targetId = event.target.id;
    }
  directListnerEvent(targetId);
}

/**
 * Receives the event from the keydown eventListener and  parses it into just 
 * the Id before passing it to the directListner function. Also calls the 
 * function to add a visual effect on keypress and filters for key presses
 * that don't have a purpose in the calculator.
 * @param {string} event 
 */
function handleKeyboard(event) {
  let eventId = event.key;
  if (eventId === '.'){
    eventId = 'decimal';
  }
  //If an id does not exists, returns
  if (document.getElementById(eventId) === null ) {
    return;
  }
     //Add visual effect to buttons based on keys pressed
  document.getElementById(eventId).classList.add('btn--keypress');
  setTimeout(() => document.getElementById(eventId).classList.remove('btn--keypress'), 150);
  directListnerEvent(eventId);
}

/**
 * Removes the newest digit of the working number, one digit at a time, 
 * and updates the statement display. Only works on the working number. Any
 * operator and numbers entered before the operator are unaffected.
 */
function backspaceButton() {
  /**Only allow backspace for working number */
  if (workingNumber === '') {
    launchToast('operand');
    return;
  }
  workingNumber = workingNumber.slice(0, workingNumber.length - 1);
  statement = statement.slice(0, statement.length - 1);
  updateDisplay(statement, resultDisplay);
  return;
}

/**
 * Changes the sign of the working number and updates the statement display 
 */
function changeSign() {
  //If there is no working number, use the value shown in the result display,
  //if there is one, as the working number
  if (workingNumber === '' && document.querySelector('#result').textContent !== '') {
    workingNumber = document.querySelector('#result').textContent;
    //reset the display 
    statement = '';
    resultDisplay = '';
    updateDisplay();
  } else if (workingNumber.length === 0) { // nothing to change
      return;
    }
  
  //Make the sign change in the working number  
  if (workingNumber.slice(0,1) === '-') { // Negative number - already has a negative sign
    workingNumber = workingNumber.slice(1); // removes negative sign
  } else { // positive number
      workingNumber = `-${workingNumber}`; // adds negative sign
    }

  if (operator.length === 0) { //no operator present
    statement = workingNumber;
  } else {
      statement = statement.slice(0, statement.lastIndexOf(' ')) + ' '; //removes the old number
      statement += workingNumber; // replace with the new number, with switched sign 
        //but leave everything before the operator in place
    }
  updateDisplay(statement, resultDisplay);
  return;
}

/**
 * Clears everything to give a fresh start.
 */
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

/**
 * Clears the working number and the corresponding portion of the statement
 * display.
 */
function clearEntry() {
  //Prevent clearing part of statement after the equals sign
  if (workingNumber === '') {
    launchToast('operand');
    return;
  }
  workingNumber = '';
  // different treatement needed if the statement display has spaces or not
  if (statement.search(/\s/) === -1) { //no spaces present === -1
    statement = ''; //clears full statement
  } else {
    // Looks for the last space charater and slices from there to the end
    // this leaves the operator and any previous entries in statement.
    statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ';
  }

  updateDisplay(statement, resultDisplay);
  return;
}

/**
 * Closes the modal with the divide by zero error message and restores the
 * normal click and keyboard event listeners.
 */
function closeModal() {
  document.querySelector('#modal').style.display = 'none';
  document.querySelector('.buttons').addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyboard);
}

/**
 * Inverts the working number, or the number shown in the result display
 */
function invertNumber() {
  // Allow the result shown on the display to be inverted and used in the next calculation
  // but not if it is a 0 or empty if the working number is empty.
  if (workingNumber === '' &&
      document.querySelector('#result').textContent !== '' &&
      document.querySelector('#result').textContent !== '0') {
    workingNumber = document.querySelector('#result').textContent;
    statement = '';
    resultDisplay = '';
    updateDisplay();
  }

  //Don't invert a non-number or 0
  if (workingNumber === '' || parseFloat(workingNumber) === 0 ) {
    return;
  }

  workingNumber = 1 / parseFloat(workingNumber);
  workingNumber = workingNumber.toString();

  // different treatment required if spaces are present 
  if (statement.search(/\s/) === -1) { // No spaces present ==== -1 (true)
    statement = limitDecimalPlaces(workingNumber, 3);
  } else {
      statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ' +
          limitDecimalPlaces(workingNumber, 3);
  }

  updateDisplay(statement, resultDisplay);
}

/**
 * Launces the modal with the divide by zero error message. This removes
 * the normal click and keyboard event listeners to force people to look at
 * the error message. A one-time eventListener is added for any keydown event
 * to allow any key to be pressed to close the modal.  The only other way
 * to close the modal is the exit x in the upper right. 
 */
function displayZeroErrorMsg() {
  document.querySelector('#modal').style.display = 'flex';
  /**Remove event listeners to prevent trying to calcualte behind the modal */
  document.querySelector('.buttons').removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleKeyboard);
  document.addEventListener('keydown', closeModal, {once: true});
}

/**
 * Launches the toast message at the bottom of the screen to show various 
 * warnings or information. The message shown is determined by what is passed
 * to the function in the purpsoe parameter.
 * @param {string} purpose - used to determine the message and classes for the toast
 */
function launchToast(purpose) {
  switch (purpose) {
    case 'excessDigits':
      message = 'You have reached the limit of the display';
      toastClasses = ["toast--warning"];
      break;
    case 'maxNumber':
      message = 'The answer exceeds the capabilites of this calculator';
      toastClasses = ["toast--warning"];
      break;
    case 'operand':
      message = 'This function only works for the current operand';
      toastClasses = ["toast--caution"];
      break;
    default:
      message = 'notification';
  }

  toastClasses.push("toast--show");
  document.querySelector('#toast').textContent = message;
  document.querySelector('#toast').classList.add(...toastClasses);
  //The toast messsage is up for 3 seconds (3000ms)
  setTimeout(() => document.querySelector('#toast').classList.remove(...toastClasses), 3000);
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

/**
 * Determines correct action to take when the equals button is pressed
 */
function processEqualsButton() {
  // Need to have two numbers and an operator to perform a calculation
  if (storedNumber.length === 0 || workingNumber.length === 0 ||operator.length === 0) {
    return;
  }

  let amountNegativeSigns = findNegativeSigns();
 
  const amountOperators = statement.match(/[+\-/*^]/g).length; //Number of operators present
  
  // After 3rd operator is pressed, resets statement to show the immediate
  // calculation that gave the result, adding parentheses in the statement.
  // This limits the size of the statement section to a reasonable amount
  // while still showing the immediate calculation that caused the displayed 
  // answer.
  if (amountOperators - amountNegativeSigns >= 2) {
    
    const resultContent = document.querySelector('#result').textContent
    statement = `(${limitDecimalPlaces(resultContent, 3)} ${operator} ${limitDecimalPlaces(workingNumber, 3)})`;
  } 

  const result = findCalculation(operator, parseFloat(storedNumber), parseFloat(workingNumber));

  if (result === 'ERROR') {// deal with divide by zero errors.
    displayZeroErrorMsg();
    clearAll();
    return;
  } else if (result === Infinity || result === -Infinity) { //deal with very large numbers
      launchToast('maxNumber');
      return;
    } else if (result.toString().length >= 14) { //keep from overflowing display
        resultDisplay = result.toExponential(4).toString();
      } else {
          resultDisplay = limitDecimalPlaces(result.toString(), 10);
          storedNumber = result.toString();
        }
  updateDisplay(statement, resultDisplay);
  
  operator = '';
  workingNumber = '';
  return;  

  /**
   * Finds the number of negative signs in the statement display. Internal to
   * the processEqualsButton function.
   */
  function findNegativeSigns() {
    let amountNegativeSigns = 0;

    // Look for `-` that are immediately followed by a number. This would indicate
    // a negative number, not a substraction sign. If none are found then the
    // match would return null. Not null means a negative sign is present.
    if (statement.match(/-(?=[0-9])/g) !== null) {
      amountNegativeSigns = statement.match(/-(?=[0-9])/g).length;
    }

    // Look for `-` that are immediately followed by decimals, indicating a
    // negative decimal number.
    if (statement.match(/-(?=\.)/g) !== null) { // not null means a negative decimal is present
      amountNegativeSigns += statement.match(/-(?=\.)/g).length;
    }
    return amountNegativeSigns;
  }
}

/**
 * Updates statement display and updates workingNumber when a number or decimal
 * is pressed
 * @param {string} numberId 
 */
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

  // Limit the size of the working number to no more than 10 characters, 
  // inclding decimals and negative signs and limit the overaall length of
  // statement to no more than 21 characters to keep from overflowing the
  // statement area.
  if(workingNumber.length > 10 || statement.length >=21 ) {
    launchToast('excessDigits');
    return;
  }

  workingNumber += numberId;
  statement += numberId;
  updateDisplay(statement, resultDisplay);
  return;
}

/**
 * Determines what to do if an operator button add, subtract, multiply, divide,
 * or exponent, is pressed. This depends on the status of the storedNumber and
 * the workingNumber, and if an operator is already active.
 * @param {string} operatorId 
 */
function processOperatorButton(operatorId) {
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

/**
 * Takes the square root or the square of a number. Depending on which button
 * is clicked, .5 or 2 is sent from the directListnerEvent function.
 * @param {number} exponent - only allowed values are .5 and 2.
 */
function squareOrRootNumber(exponent) {
  const resultNumber = document.querySelector('#result').textContent;

  // Don't try to take the square root of a negative number
  if (exponent === .5 && (workingNumber < 0 || parseFloat(resultNumber) < 0)) {
    return;
  }

  // Allow the number in the result display to be worked on and 
  // used in the next calculation
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

  //  different treatment required if spaces are present 
  if (statement.search(/\s/) === -1) { // No spaces present ==== -1 (true)
   statement = limitDecimalPlaces(workingNumber, 3);
  } else { //no spaces in statement
     statement = statement.slice(0, statement.lastIndexOf(' ')) + ' ' +
        limitDecimalPlaces(workingNumber, 3);
    }
 updateDisplay(statement, resultDisplay);
}

/**
 * Updates the statement and results display on the screen
 * @param {string} statement 
 * @param {string} resultDisplay 
 */
function updateDisplay(statement, resultDisplay) {
  document.querySelector('#statement').textContent = statement;
  document.querySelector('#result').textContent = resultDisplay;
}
