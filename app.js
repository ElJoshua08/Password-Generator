// Variables de configuración
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,./<>?';

// Función para generar una contraseña
function generatePassword(length, uppercase, lowercase, numbers, symbols) {
  let totalCharacters = '';

  if (uppercase) totalCharacters += UPPERCASE_LETTERS;
  if (lowercase) totalCharacters += LOWERCASE_LETTERS;
  if (numbers) totalCharacters += NUMBERS;
  if (symbols) totalCharacters += SYMBOLS;

  if (totalCharacters.length === 0) {
    alert('Por favor, selecciona al menos una opción');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += totalCharacters.charAt(
      Math.floor(Math.random() * totalCharacters.length)
    );
  }

  let $password = document.querySelector('.password');
  $password.innerText = password;
}

// Función para inicializar la página
function initializePage() {
  // Inicializar el favicon, dependiendo de si el usuario prefiere el
  // modo oscuro o no
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) { 
    document.querySelector('link[rel="icon"]').href = "./icon/favicon.dark.svg"
  } else {
    document.querySelector('link[rel="icon"]').href = "./icon/favicon.light.svg"
  }


  // Inicializar el valor del rango de longitud de la contraseña
  let $passwordLength = document.getElementById('PasswordLengthInput');
  let $passwordLengthValue = document.querySelector('.passwordLengthValue');

  $passwordLength.addEventListener('input', (e) => {
    $passwordLengthValue.innerHTML = e.target.value;
  });

  // Configurar el fondo del rango de longitud de la contraseña
  $passwordLength.addEventListener('input', setRangeSlider);

  function setRangeSlider() {
    const percent =
      ($passwordLength.value - $passwordLength.min) /
      ($passwordLength.max - $passwordLength.min);

    let completeColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary');
    let notCompleteColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--secondary-darker');
    let color = `linear-gradient(to right, ${completeColor} ${
      percent * 100
    }%, ${notCompleteColor} ${percent * 100}%)`;

    $passwordLength.style.background = color;
  }

  // Generar una contraseña inicial al cargar la página
  generatePassword(17, false, true, true, false);
}

// Copiar la contraseña al portapapeles
function copyPassword() {
  let $password = document.querySelector('.password');
  navigator.clipboard.writeText($password.innerText);
  alert("Password Copied!")
}

// Escuchar eventos
window.addEventListener('load', initializePage);

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
$copyButton.addEventListener('click', copyPassword);
