let $passwordLength = document.getElementById('PasswordLengthInput');
let $passwordLengthValue = document.querySelector('.passwordLengthValue');

const rootStyles = getComputedStyle(document.documentElement);

$passwordLength.addEventListener('input', (e) => {
  $passwordLengthValue.innerHTML = e.target.value;
});

$passwordLength.addEventListener('input', setRangeSlider);

function setRangeSlider() {
  const percent =
    ($passwordLength.value - $passwordLength.min) /
    ($passwordLength.max - $passwordLength.min);

  let color;

  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    // El sistema prefiere el tema oscuro
    let completeColor = rootStyles.getPropertyValue('--dark-primary');
    let notCompleteColor = rootStyles.getPropertyValue(
      '--dark-secondary-darker'
    );
    color = `linear-gradient(to right, ${completeColor} ${
      percent * 100
    }%, ${notCompleteColor} ${percent * 100}%)`;
  } else {
    // El sistema no prefiere el tema oscuro
    let completeColor = rootStyles.getPropertyValue('--light-primary');
    let notCompleteColor = rootStyles.getPropertyValue(
      '--light-secondary-darker'
    );
    color = `linear-gradient(to right, ${completeColor} ${
      percent * 100
    }%, ${notCompleteColor} ${percent * 100}%)`;
  }

  $passwordLength.style.background = color;
}

const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,./<>?';

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
  // This includes all the possible characters
  let totalCharacters = '';
  let password = '';

  if (uppercase) {
    totalCharacters += UPPERCASE_LETTERS;
  }

  if (lowercase) {
    totalCharacters += LOWERCASE_LETTERS;
  }

  if (numbers) {
    totalCharacters += NUMBERS;
  }

  if (symbols) {
    totalCharacters += SYMBOLS;
  }

  // If no box checked send an error
  if (totalCharacters.length === 0) {
    alert('Please select at least one option');
    return;
  }

  for (let i = 0; i < length; i++) {
    password += totalCharacters.charAt(
      Math.floor(Math.random() * totalCharacters.length)
    );
  }

  let $password = document.querySelector('.password');
  $password.innerText = password;
}

window.addEventListener('load', () => {
  generatePassword(17, false, true, true, false);
});

let $generatePassword = document.getElementById('GeneratePasswordButton');
$generatePassword.addEventListener('click', () => {
  let passwordLength = document.getElementById('PasswordLengthInput').value;
  let uppercase = document.getElementById('IncludeUppercase').checked;
  let lowercase = document.getElementById('IncludeLowercase').checked;
  let numbers = document.getElementById('IncludeNumbers').checked;
  let symbols = document.getElementById('IncludeSymbols').checked;

  generatePassword(passwordLength, uppercase, lowercase, numbers, symbols);
});

let $copyButton = document.getElementById('CopyButton');
$copyButton.addEventListener('click', (e) => {
  // Copy the password to the clipboard
  let $password = document.querySelector('.password');
  navigator.clipboard.writeText($password.innerText);
});
