document.addEventListener("DOMContentLoaded", function() {
  var display = document.getElementById("result");
  var outwardEquation = "";
  var inwardEquation = "";
  let buffer = '';
  let equationsLog = [];
  let memoryValue = 0;
  var laterValueForLog = "10"


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

  function changePositiveNegative() {
      // `changePositiveNegative` should toggle the sign of the number
      if (inwardEquation.charAt(0) == '-') {
          outwardEquation = outwardEquation.slice(1);
          inwardEquation = inwardEquation.slice(1);
      } else {
          outwardEquation = `-${outwardEquation}`;
          inwardEquation = `-${inwardEquation}`;
      }
      display.innerText = outwardEquation;
  }

  function appendTrigFunc(trigFunc) {
      //`appendTrigFunc` should add trigonometric function to display
      if (trigFunc == 'sin') {
          outwardEquation += "sin(";
          inwardEquation += "sin(";
      } else if (trigFunc == 'cos') {
          outwardEquation += "cos(";
          inwardEquation += "cos(";
      } else if (trigFunc == "tan") {
          outwardEquation += "tan(";
          inwardEquation += "tan(";
      }
      display.innerText = outwardEquation;
  }

  function appendInverseTrigFunc(inverseTrigFunc) {
      // `appendInverseTrigFunc` should add inverse trigonometric function to display
      if (inverseTrigFunc == 'asin') {
          outwardEquation += "asin(";
          inwardEquation += "asin(";
      } else if (inverseTrigFunc == 'acos') {
          outwardEquation += "acos(";
          inwardEquation += "acos(";
      } else if (inverseTrigFunc == "atan") {
          outwardEquation += "atan(";
          inwardEquation += "atan(";
      }
      display.innerText = outwardEquation;
  }

  function appendLog(logBase) {
      //`appendLog` should add log function to display
      console.log('appendLog called with logBase:', logBase);
      if (logBase === '10') {
          outwardEquation += 'log(';
          inwardEquation += 'log(';
      } else if (logBase === 'e') {
          var operatorsOnly = outwardEquation.replace(/[0-9]+/g, "");
          var lastOperator = outwardEquation.charAt(operatorsOnly.length - 1);
          if (lastOperator == "") {
              var e = outwardEquation;
          } else {
              var e = outwardEquation.split(lastOperator);
          }

          outwardEquation += "vlog(";
          if (e.constructor === Array) {
              inwardEquation = inwardEquation.slice(0, -e[1].length)
              inwardEquation += `log(${laterValueForLog}, ${e[e.length - 1]}`;
          } else {
              inwardEquation = inwardEquation.slice(e)
              inwardEquation += `log(${laterValueForLog}, ${e}`;
          }

      } else {
          console.error('Invalid log base:', e[e.length - 1]);
          return;
      }
      console.log('outwardEquation:', outwardEquation);
      console.log('inwardEquation:', inwardEquation);
      display.innerText = outwardEquation;
  }

  function appendPi() {
      //`appendPi` should add π to display
      if (/[0-9π]$/.test(outwardEquation)) {
          outwardEquation += 'π';
          inwardEquation += '*π';
      } else {
          outwardEquation += 'π';
          inwardEquation += 'π';
      }
      display.innerText = outwardEquation;
  }

  function appendExpFunc(expFunc) {
      //`appendExpFunc` should add exponential function to display
      if (expFunc == 'exp') {
          outwardEquation += "exp(";
          inwardEquation += "exp(";
      } else if (expFunc == 'pow') {
          outwardEquation += "^";
          inwardEquation += "**";
      }
      display.innerText = outwardEquation;
  }

  function appendSqrt() {
      //`appendSqrt` should add square root function to display
      outwardEquation += "√(";
      inwardEquation += "sqrt(";
      display.innerText = outwardEquation;
      console.log(outwardEquation);
  }

  function squareInput() {
      outwardEquation = `(${outwardEquation})^2`; // Square the current input
      inwardEquation = `(${inwardEquation})^2`;
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
    buffer += key;
    if (buffer.endsWith('sqrt')) {
        buffer = buffer.slice(0, -4);
        appendOperator('√');
    } else if (buffer.endsWith('log')) {
        buffer = buffer.slice(0, -3);
        appendLog('10')
    } else if (buffer.endsWith('asin')) {
        buffer = buffer.slice(0, -3);
        appendInverseTrigFunc('asin')
    } else if (buffer.endsWith('acos')) {
        buffer = buffer.slice(0, -3);
        appendInverseTrigFunc('acos')
    } else if (buffer.endsWith('Escape')) {
      clearDisplay()
    } else if (buffer.endsWith('atan')) {
        buffer = buffer.slice(0, -3);
        appendInverseTrigFunc('atan')
    } else if (buffer.endsWith('sin')) {
        buffer = buffer.slice(0, -3);
        appendTrigFunc('sin')
    } else if (buffer.endsWith('cos')) {
        buffer = buffer.slice(0, -3);
        appendTrigFunc('cos')
    } else if (buffer.endsWith('tan')) {
        buffer = buffer.slice(0, -3);
        appendTrigFunc('tan')
    } else if (/[0-9]/.test(key)) {
        appendCharacter(key);
    } else if (/[+\-*/^√]/.test(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        //calculate();
    } else if (key === 'Backspace') {
        deleteLast();
        buffer = buffer.slice(0, -1);
    }  else if (key === '(' || key === ')') {
        appendParenthesis(key);
    } else if (key === '.') {
        appendCharacter(key);
    }
  });

  function calculate() {   
    fetch('./calculate.py', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // or 'application/json' 'x-www-form-urlencoded' if needed
      },
      body: JSON.stringify({ param: inwardEquation }) // For form-urlencoded data
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // or response.text() based on your expected response type
      })
      .then(data => {
        outwardEquation = data;
        inwardEquation = data;
        display.innerText = outwardEquation;
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    console.log("calculate function run, look at answer")
  }

  window.clearDisplay = clearDisplay;
  window.deleteLast = deleteLast;
  window.appendCharacter = appendCharacter;
  window.appendOperator = appendOperator;
  window.appendParenthesis = appendParenthesis;
  window.squareInput = squareInput;
  window.appendSqrt = appendSqrt;
  window.appendPi = appendPi;
  window.changePositiveNegative = changePositiveNegative;
  window.appendTrigFunc = appendTrigFunc;
  window.appendInverseTrigFunc = appendInverseTrigFunc;
  window.appendLog = appendLog;
  window.appendExpFunc = appendExpFunc;
  window.calculate = calculate;
});