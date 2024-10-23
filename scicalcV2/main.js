var display = document.getElementById("result");
var outwardEquation = "";
var inwardEquation = "";


function clearDisplay() {
  outwardEquation = '';
  inwardEquation = "";
  display.innerText = '0';
}

function deleteLast() {
  outwardEquation = outwardEquation.slice(0, -1);
  inwardEquation = inwardEquation.slice(0, -1);
  display.innerText = outwardEquation || '0';
}

function appendOperator(operator) {
  if (/[+\-*/^]$/.test(outwardEquation)) {
      outwardEquation = outwardEquation.slice(0, -1) + operator;
      inwardEquation = inwardEquation.slice(0, -1) + operator;
  } else {
      outwardEquation += operator;
      inwardEquation += operator;
  }
  display.innerText = outwardEquation;
}

function appendParenthesis(parenthesis) {
  if (parenthesis === '(' && /[0-9)]$/.test(inwardEquation)) {
    inwardEquation += '*';
  }
  if (/[)]$/.test(inwardEquation) && /[0-9(]/.test(parenthesis)) {
    inwardEquation += '*';
  }
  outwardEquation += parenthesis;
  inwardEquation += parenthesis;
  display.innerText = outwardEquation;
}

function appendCharacter(character) {
  outwardEquation += character;
  //ADD CODE TO CHANGE WHAT THE INWARDEQUATION LOGGING DOES FOR CERTAIN FUNCTIONS--MAYBE. THIS COULD ALSO BE
  //ONLY FOR OTHER FUNCTIONS THAT ARE SPECIFICALLY FOR ADDING OTHER SPECIAL FUNCIOTNS
  inwardEquation += character
  display.innerText = outwardEquation;
  console.log(outwardEquation)
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
      appendCharacter(key);
  } else if (/[+\-*/]/.test(key)) {
  } else if (/[+\-*/^]/.test(key)) {
      appendOperator(key);
  } else if (key === 'Enter') {
      //calculate();
  } else if (key === 'Backspace') {
      deleteLast();
  } else if (key === 'Escape') {
      clearDisplay();
  } else if (key === '(' || key === ')') {
      appendParenthesis(key);
  } else if (key === '.') {
      appendCharacter(key);
  }
});

window.appendCharacter = appendCharacter;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.appendOperator = appendOperator;
window.appendParenthesis = appendParenthesis;