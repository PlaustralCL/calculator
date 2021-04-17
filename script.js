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

for (let i = 0; i <= 10; i++) {
  const firstNumber = parseInt(prompt('First number?'));
  const operator = prompt('Operator?');
  const secondNumber = parseInt(prompt('Second number?'));
  const result = operate(operator,firstNumber, secondNumber);
  console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
}