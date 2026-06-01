function getElement<T extends Element>(
  selector: string,
  elementType: { new (): T },
  errorMessage: string,
): T {
  const element = document.querySelector(selector);

  if (!(element instanceof elementType)) {
    throw new Error(errorMessage);
  }

  return element;
}

// Elements
const signupForm = getElement(
  ".js-signup-form",
  HTMLFormElement,
  "Signup form not found",
);

const emailInput = getElement(
  ".js-email",
  HTMLInputElement,
  "Email input not found",
);

const usernameInput = getElement(
  ".js-username",
  HTMLInputElement,
  "Username input not found",
);

const passwordInput = getElement(
  ".js-password",
  HTMLInputElement,
  "Password input not found",
);

const confirmPasswordInput = getElement(
  ".js-confirm-password",
  HTMLInputElement,
  "Confirm password input not found",
);

const emailError = getElement(
  ".js-email-error",
  HTMLElement,
  "Email error element not found",
);

const usernameError = getElement(
  ".js-username-error",
  HTMLElement,
  "Username error element not found",
);

const passwordError = getElement(
  ".js-password-error",
  HTMLElement,
  "Password error element not found",
);

const confirmError = getElement(
  ".js-confirm-error",
  HTMLElement,
  "Confirm error element not found",
);

const userInfo = getElement(
  ".js-user-info",
  HTMLElement,
  "User info element not found",
);

// Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^\S(.*\S)?$/;
const PASSWORD_REGEX = /^(?=.*[^A-Za-z]).{8,}$/;

// Error messages
const ERROR_MESSAGES = {
  EMAIL: "Invalid email format",
  USERNAME: "Invalid username format",
  PASSWORD: "Password must be at least 8 characters and contain a non-letter",
  CONFIRM_REQUIRED: "Confirm password is required",
  CONFIRM_MISMATCH: "Passwords do not match",
} as const;

// Validation helpers
function validateInput(
  input: HTMLInputElement,
  errorEl: HTMLElement,
  regex: RegExp,
  message: string,
): void {
  input.addEventListener("input", () => {
    const value = input.value.trim();

    errorEl.textContent = !value || !regex.test(value)
      ? message
      : "";
  });
}

function validatePasswordMatch(
  password: string,
  confirmPassword: string,
): string {
  if (!confirmPassword) {
    return ERROR_MESSAGES.CONFIRM_REQUIRED;
  }

  if (password !== confirmPassword) {
    return ERROR_MESSAGES.CONFIRM_MISMATCH;
  }

  return "";
}

// Live validation
validateInput(
  emailInput,
  emailError,
  EMAIL_REGEX,
  ERROR_MESSAGES.EMAIL,
);

validateInput(
  usernameInput,
  usernameError,
  USERNAME_REGEX,
  ERROR_MESSAGES.USERNAME,
);

validateInput(
  passwordInput,
  passwordError,
  PASSWORD_REGEX,
  ERROR_MESSAGES.PASSWORD,
);

confirmPasswordInput.addEventListener("input", () => {
  confirmError.textContent = validatePasswordMatch(
    passwordInput.value.trim(),
    confirmPasswordInput.value.trim(),
  );
});

// Submit
function validateForm(event: SubmitEvent): void {
  event.preventDefault();

  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const confirmMessage = validatePasswordMatch(
    password,
    confirmPassword,
  );

  confirmError.textContent = confirmMessage;

  const isValid =
    EMAIL_REGEX.test(email) &&
    USERNAME_REGEX.test(username) &&
    PASSWORD_REGEX.test(password) &&
    !confirmMessage;

  if (!isValid) {
    return;
  }

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

// Reset
signupForm.addEventListener("reset", () => {
  requestAnimationFrame(() => {
    emailError.textContent = ERROR_MESSAGES.EMAIL;
    usernameError.textContent = ERROR_MESSAGES.USERNAME;
    passwordError.textContent = ERROR_MESSAGES.PASSWORD;
    confirmError.textContent = ERROR_MESSAGES.CONFIRM_REQUIRED;

    userInfo.innerHTML = "";
  });
});
