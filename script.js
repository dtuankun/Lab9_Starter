let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let output = document.querySelector('output');
  let firstNum = document.querySelector('#first-num').value;
  let secondNum = document.querySelector('#second-num').value;
  let operator = document.querySelector('#operator').value;
  output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
});

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

// Start your code here
// You may move this JS to another file if you wish
const logBtn = errorBtns[0];
const errorBtn = errorBtns[1];
const countBtn = errorBtns[2];
const warnBtn = errorBtns[3];
const assertBtn = errorBtns[4];
const clearBtn = errorBtns[5];
const dirBtn = errorBtns[6];
const dirxmlBtn = errorBtns[7];
const groupStartBtn = errorBtns[8];
const groupEndBtn = errorBtns[9];
const tableBtn = errorBtns[10];
const timerStartBtn = errorBtns[11];
const timerEndBtn = errorBtns[12];
const traceBtn = errorBtns[13];
const globalErrorBtn = errorBtns[14];

// Console.log
logBtn.addEventListener('click', () => {
  function getTime() {
    let date = new Date();
    console.log('debugging getTime', { rawDate: date });
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    console.log({ hours, minutes, seconds });
    let time = `${hours}:${minutes}:${seconds}`;
    return time;
  }
  getTime();
});

// Console.error
errorBtn.addEventListener('click', () => {
  function divideFn(a, b) {
    if (b === 0) {
      console.error('You cannot divide by zero: ', { a, b });
      return;
    }
    return a / b;
  }
  divideFn(10, 0);
  // This won't print any logs
  divideFn(10, 1);
});

// Console.count
countBtn.addEventListener('click', () => {
  function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = `${hours}:${minutes}:${seconds}`;
    return time;
  }
  console.log('This should end in 5 seconds, with 5 count.');
  const intv = setInterval(() => {
    console.log(getTime());
    console.count('timeout 1000');
  }, 1000);

  setTimeout(() => {
    clearInterval(intv);
  }, 5000);
});

// Console.warn
warnBtn.addEventListener('click', () => {
  function addNums(a, b) {
    if (a === 0 || b === 0) {
      console.warn("Addition with 0 won't change the output.");
      return;
    }
    return a + b;
  }
  addNums(10, 0);
  // This won't print any logs
  addNums(10, 1);
});

// Console.assert
assertBtn.addEventListener('click', () => {
  console.log('Is it christmas?');

  const writingTime = new Date('November 18, 2021');
  const christmasTime = new Date('December 25, 2021');
  console.assert(writingTime === christmasTime, {
    writingTime,
    christmasTime,
    reason: 'The current time is not Christmas',
  });
});

// Console.clear
clearBtn.addEventListener('click', () => {
  console.clear();
  console.log('clearing before logging massive data');
  console.log('"massive data"');
});

// Console.dir
dirBtn.addEventListener('click', () => {
  const obj = {
    foo: 'bar',
    baz: 'qux',
  };
  console.log('object' + obj);
  console.dir(obj);
});

// Console.dirxml
dirxmlBtn.addEventListener('click', () => {
  console.dirxml(form);
});

// Console.group
groupStartBtn.addEventListener('click', () => {
  console.group(
    'Console Group Start, try adding another console log etc., then click group end.'
  );
});

// Console.groupEnd
groupEndBtn.addEventListener('click', () => {
  console.groupEnd();
});

// Console.table
tableBtn.addEventListener('click', () => {
  //  10 pokemons
  const pokemons = [
    {
      name: 'Pikachu',
      type: 'Electric',
      level: 50,
    },
    {
      name: 'Charmander',
      type: 'Fire',
      level: 40,
    },
    {
      name: 'Bulbasaur',
      type: 'Grass',
      level: 30,
    },
    {
      name: 'Squirtle',
      type: 'Water',
      level: 20,
    },
  ];

  console.table(pokemons);
});

// Console.time
timerStartBtn.addEventListener('click', () => {
  console.log('timer is counting... hit end timer to see the result');
  console.time('timer');
});

// Console.timeEnd
timerEndBtn.addEventListener('click', () => {
  console.timeEnd('timer');
});

// Console.trace
traceBtn.addEventListener('click', () => {
  function getContactInformation() {
    getName();
  }
  function getName() {
    getId();
  }
  function getId() {
    console.trace();
    return '0';
  }

  getContactInformation();
});

class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Custom Error';
  }
}

// Global error
globalErrorBtn.addEventListener('click', () => {
  throw new Error("This is a global error, don't push this button again.");
});

//#region  //*=========== Step 3 ===========
const inputEl = document.querySelector('#step-3 input');
const step2Form = document.querySelector('#step-3 form');
const helperText = document.querySelector('#step-3 #helper');

function validatePassword(e) {
  e.preventDefault();

  try {
    if (inputEl.value !== 'admin') {
      throw new Error('Error: password is invalid');
    }
    helperText.textContent = 'You are now logged in.';
  } catch (error) {
    helperText.textContent = error.message;
    setTimeout(() => {
      helperText.textContent = 'password is admin (wink wink)';
    }, 2000);
  } finally {
    inputEl.value = '';
  }
}

step2Form.addEventListener('submit', validatePassword);
//#endregion  //*======== Step 3 ===========

//#region  //*=========== Step 4 ===========
const input3El = document.querySelector('#step-4 input');
const step3Form = document.querySelector('#step-4 form');
const helper3Text = document.querySelector('#step-4 #helper');

class WrongPassword extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongPassword';
  }
}

class EmptyInput extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmptyInput';
  }
}

function validatePassword(e) {
  e.preventDefault();

  try {
    if (input3El.value === '') {
      throw new EmptyInput('input is empty');
    } else if (input3El.value !== 'admin') {
      throw new WrongPassword('password is invalid');
    } else {
      helper3Text.textContent = 'You are now logged in.';
    }
  } catch (error) {
    helper3Text.textContent = error.message;
    setTimeout(() => {
      helper3Text.textContent = 'password is admin (wink wink)';
    }, 2000);
  } finally {
    input3El.value = '';
  }
}

step3Form.addEventListener('submit', validatePassword);
//#endregion  //*======== Step 4 ===========

//#region  //*=========== Step 5 ===========
window.onerror = (message, url, lineNumber, column, error) => {
  console.log('Window on error', {
    message: JSON.stringify(message),
    url,
    lineNumber,
    column,
    error,
  });
  TrackJS.track(message);
};
//#endregion  //*======== Step 5 ===========
