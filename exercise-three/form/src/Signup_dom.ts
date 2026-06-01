function getElement<T extends Element>(
  selector: string,
  errorMessage: string,
): T {
  const element = document.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(errorMessage);
  }

  return element as unknown as T;
}

// Elements
const signupForm = getElement<HTMLFormElement>(
  ".js-signup-form",
  "Signup form not found",
);

const emailInput = getElement<HTMLInputElement>(
  ".js-email",
  "Email input not found",
);
const usernameInput = getElement<HTMLInputElement>(
  ".js-username",
  "Username input not found",
);
const passwordInput = getElement<HTMLInputElement>(
  ".js-password",
  "Password input not found",
);
const confirmPasswordInput = getElement<HTMLInputElement>(
  ".js-confirm-password",
  "Confirm password input not found",
);

const emailError = getElement<HTMLElement>(
  ".js-email-error",
  "Email error element not found",
);
const usernameError = getElement<HTMLElement>(
  ".js-username-error",
  "Username error element not found",
);
const passwordError = getElement<HTMLElement>(
  ".js-password-error",
  "Password error element not found",
);
const confirmError = getElement<HTMLElement>(
  ".js-confirm-error",
  "Confirm error element not found",
);

const userInfo = getElement<HTMLElement>(
  ".js-user-info",
  "User info element not found",
);

// Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^\S(.*\S)?$/;
const PASSWORD_REGEX = /^(?=.*[^A-Za-z]).{8,}$/;

// Validation helpers
function validateInput(
  input: HTMLInputElement,
  errorEl: HTMLElement,
  regex: RegExp,
  message: string,
): void {
  input.addEventListener("input", () => {
    const value = input.value.trim();

    errorEl.textContent = value === "" || !regex.test(value) ? message : "";
  });
}

function validatePasswordMatch(password: string, confirm: string): string {
  if (confirm === "") return "Confirm password is required";
  if (confirm !== password) return "Passwords do not match";
  return "";
}

// Apply live validation
validateInput(emailInput, emailError, EMAIL_REGEX, "Invalid email format");
validateInput(
  usernameInput,
  usernameError,
  USERNAME_REGEX,
  "Invalid username format",
);
validateInput(
  passwordInput,
  passwordError,
  PASSWORD_REGEX,
  "Password must be at least 8 characters and contain a non-letter",
);

// Confirm password live check
confirmPasswordInput.addEventListener("input", () => {
  confirmError.textContent = validatePasswordMatch(
    passwordInput.value.trim(),
    confirmPasswordInput.value.trim(),
  );
});

// Submit handler
function validateForm(event: SubmitEvent): void {
  event.preventDefault();

  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const confirmErrorMsg = validatePasswordMatch(password, confirmPassword);
  if (confirmErrorMsg) {
    confirmError.textContent = confirmErrorMsg;
    return;
  }

  const isValid =
    EMAIL_REGEX.test(email) &&
    USERNAME_REGEX.test(username) &&
    PASSWORD_REGEX.test(password);

  if (!isValid) return;

  userInfo.innerHTML = `
    <div class="user-info">
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Confirm:</strong> ${confirmPassword}</p>
    </div>
  `;
}

signupForm.addEventListener("submit", validateForm);

// Reset handler
signupForm.addEventListener("reset", () => {
  requestAnimationFrame(() => {
    emailError.textContent = "Invalid email format";
    usernameError.textContent = "Invalid username format";
    passwordError.textContent =
      "Password must be at least 8 characters and contain a non-letter";
    confirmError.textContent = "Confirm password is required";

    userInfo.innerHTML = "";
  });
});
