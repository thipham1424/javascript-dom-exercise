const getElement = (selector, errorMessage) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(errorMessage);
  }

  return element;
};

const signupForm = getElement(
  ".js-signup-form",
  "Signup form not found"
);

const emailInput = getElement(
  ".js-email",
  "Email input not found"
);

const usernameInput = getElement(
  ".js-username",
  "Username input not found"
);

const passwordInput = getElement(
  ".js-password",
  "Password input not found"
);

const confirmPasswordInput = getElement(
  ".js-confirm-password",
  "Confirm password input not found"
);

const emailError = getElement(
  ".js-email-error",
  "Email error element not found"
);

const usernameError = getElement(
  ".js-username-error",
  "Username error element not found"
);

const passwordError = getElement(
  ".js-password-error",
  "Password error element not found"
);

const confirmError = getElement(
  ".js-confirm-error",
  "Confirm password error element not found"
);

const userInfo = getElement(
  ".js-user-info",
  "User info element not found"
);

// Email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username:
const usernameRegex = /^\S(.*\S)?$/;

// Password:
const passwordRegex = /^(?=.*[^A-Za-z]).{8,}$/;

const validateInput = (inputElement, errorElement, regex, errorMessage) => {
  inputElement.addEventListener("input", () => {
    const value = inputElement.value.trim();

    if (value !== "" && regex.test(value)) {
      errorElement.textContent = "";
    } else {
      errorElement.textContent = errorMessage;
    }
  });
};

// EMAIL
validateInput(
  emailInput,
  emailError,
  emailRegex,
  "Email address empty or wrong format. Example: username@somewhere.sth",
);

// USERNAME
validateInput(
  usernameInput,
  usernameError,
  usernameRegex,
  "Please enter the correct format for Username. (No leading or trailing spaces)",
);

// PASSWORD
validateInput(
  passwordInput,
  passwordError,
  passwordRegex,
  "Please enter the correct format for password. (8 characters at least one non-letter)",
);

// CONFIRM PASSWORD
confirmPasswordInput.addEventListener("input", () => {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (confirmPassword === "") {
    confirmError.textContent = "Confirm password is required";
    return;
  }

  if (confirmPassword !== password) {
    confirmError.textContent = "Passwords do not match";
    return;
  }

  confirmError.textContent = "";
});

const validateForm = (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  const username = usernameInput.value.trim();

  const password = passwordInput.value.trim();

  const confirmPassword = confirmPasswordInput.value.trim();

  if (confirmPassword !== password) {
    confirmError.textContent = "Make sure password and confirm passwords match";

    return;
  }

  const isFormValid =
    emailRegex.test(email) &&
    usernameRegex.test(username) &&
    passwordRegex.test(password);

  if (!isEmailValid || !isUsernameValid || !isPasswordValid) {
    return;
  }

  const resultHTML = `
    <div class="user-info">

      <p>
        <strong>Email:</strong>
        ${email}
      </p>

      <p>
        <strong>Username:</strong>
        ${username}
      </p>

      <p>
        <strong>Password:</strong>
        ${password}
      </p>

      <p>
        <strong>Confirm Password:</strong>
        ${confirmPassword}
      </p>

    </div>
  `;

  userInfo.innerHTML = resultHTML;
};

signupForm.addEventListener("submit", validateForm);

signupForm.addEventListener("reset", () => {
  requestAnimationFrame(() => {
    emailError.textContent = [
      "Email address empty or wrong format.",
      "Example: username@somewhere.sth"
    ].join(" ");

    usernameError.textContent = [
      "Please enter the correct format",
      "for Username.",
      "(No leading or trailing spaces)"
    ].join(" ");

    passwordError.textContent = [
      "Please enter the correct format",
      "for password.",
      "(8 characters at least one non-letter)"
    ].join(" ");

    confirmError.textContent = [
      "Please enter the correct format",
      "for confirm password.",
      "(8 characters at least one non-letter)"
    ].join(" ");
    
    userInfo.innerHTML = "";
  });
});
