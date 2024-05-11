import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
// const calculateButton = document.getElementById("calculate-results");

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  // const startingAmount = Number(form['satrtingAmount'].value)
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  const errorInputsContaiers = document.querySelectorAll(".error");

  for (const errorInputsContaier of errorInputsContaiers) {
    errorInputsContaier.classList.remove("error");
    errorInputsContaier.parentElement.querySelector("p").remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === "") {
    console.log("1");
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    console.log("2");
    // objetivo <p class='text-red-500'>Insira um valor numérico e maior que zero</p>
    const errorTextElemnet = document.createElement("p"); //<p></p>
    errorTextElemnet.classList.add("text-red-500"); //<p class='text-red-500'></p>
    errorTextElemnet.innerText = "Insira um valor numérico e maior que zero"; //<p class='text-red-500'>Insira um valor numérico e maior que zero</p>

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElemnet);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
// calculateButton.addEventListener("click", renderProgression);
clearFormButton.addEventListener("click", clearForm);
