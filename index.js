const range = document.querySelector('#range');
const lowerCasesCheckBox = document.querySelector('#lowercases_checkbox');
const numbersCheckBox = document.querySelector('#numbers_checkbox');
const upperCasesCheckBox = document.querySelector('#uppercases_checkbox');
const symbolsCheckBox = document.querySelector('#symbols_checkbox');
const passwordLength = document.querySelector('.password_length');
const generator = document.querySelector('.submit');
const result = document.querySelector('.result');

const numbersArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowerCasesArr =  'abcdefghijklmnopqrstuvwxyz'.split('');
const upperCasesArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const symbolsArr = '!@#$%^&*()_+-=±§~`<,>.?/":;|\}]{['.split('');

range.oninput = function () {
    passwordLength.innerHTML = this.value;
}

generator.addEventListener('click', generatePass);

function generatePass() {
    let arr = createArrForGeneration();
    arr = arr.sort(compareRandom);

    let out = '';
    const passwordLengthValue = +range.value;

    for(let i = 0; i < passwordLengthValue; i++) {
        out += arr[randomInt(0, arr.length - 1)];
    }

    if (allCheckBoxesAreNotDisabled()) {
        result.textContent = out;
    } else {
        result.textContent = '';
    }
}

result.addEventListener('click', function() {
    let textarea = document.createElement('textarea');
    textarea.value = result.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
});

function createArrForGeneration() {
    let arr = [];

    if(lowerCasesCheckBox.checked) {
        arr = arr.concat(lowerCasesArr);
    }

    if(numbersCheckBox.checked) {
        arr = arr.concat(numbersArr);
    }

    if(upperCasesCheckBox.checked) {
        arr = arr.concat(upperCasesArr);
    }

    if(symbolsCheckBox.checked) {
        arr = arr.concat(symbolsArr);
    }

    return arr;
}

function allCheckBoxesAreNotDisabled() {
    return !(!lowerCasesCheckBox.checked && !numbersCheckBox.checked && !upperCasesCheckBox.checked && !symbolsCheckBox.checked);
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function randomInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}


