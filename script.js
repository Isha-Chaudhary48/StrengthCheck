const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasons = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrenghtMeter);
updateStrenghtMeter();

function updateStrenghtMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;

  reasons.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasons.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(specialCharacterWeakness(password));
  weaknesses.push(wordPassword(password));
  return weaknesses;
}
function lengthWeakness(password) {
  const length = password.length;
  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }
  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}
function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase");
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase");
}
function specialCharacterWeakness(password) {
  return characterTypeWeakness(password, /[@#$%&*]/g, "special");
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex || []);
  console.log(`Matches for ${type}:`, matches); //

  if (matches === null || matches.length === 0) {
    return {
      message: `Your password require ${type} characters`,
      deduction: 10,
    };
  }
  if (matches.length <= 2) {
    return {
      message: ` Your password should use more ${type} characters`,
      deduction: 5,
    };
  }
}
function wordPassword(password) {
  if (passwordInput.value === "password") {
    return {
      message: "Password should not be password",
      deduction: 70,
    };
  }
}
