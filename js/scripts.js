const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratonButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInputs = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPassword = document.querySelector("#copy-password");

// funções

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbols = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbols,
) => {
  let password = "";

  const passwordlength = +lengthInputs.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbols);
  }

  if (generators.length === 0) return;

  for (let i = 0; i < passwordlength; i += generators.length) {
    generators.forEach(() => {
      const random =
        generators[Math.floor(Math.random() * generators.length)]();

      password += random;
    });
  }


  password.slice(0, passwordlength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};



// Eventos

openCloseGeneratonButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbols,
  );
});

copyPassword.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPassword.innerHTML = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPassword.innerText = "Copiar";
    }, 1000);
  });
});
