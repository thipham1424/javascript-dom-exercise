// Elements
const signupForm =
  document.querySelector<HTMLFormElement>(".js-signup-form");

if (!signupForm) {
  throw new Error("Signup form not found");
}

const emailInput =
  document.querySelector<HTMLInputElement>(".js-email");

if (!emailInput) {
  throw new Error("Email input not found");
}

const usernameInput =
  document.querySelector<HTMLInputElement>(".js-username");

if (!usernameInput) {
  throw new Error("Username input not found");
}

const passwordInput =
  document.querySelector<HTMLInputElement>(".js-password");

if (!passwordInput) {
  throw new Error("Password input not found");
}

const confirmPasswordInput =
  document.querySelector<HTMLInputElement>(".js-confirm-password");

if (!confirmPasswordInput) {
  throw new Error("Confirm password input not found");
}

const emailError =
  document.querySelector<HTMLElement>(".js-email-error");

if (!emailError) {
  throw new Error("Email error element not found");
}

const usernameError =
  document.querySelector<HTMLElement>(".js-username-error");

if (!usernameError) {
  throw new Error("Username error element not found");
}

const passwordError =
  document.querySelector<HTMLElement>(".js-password-error");

if (!passwordError) {
  throw new Error("Password error element not found");
}

const confirmError =
  document.querySelector<HTMLElement>(".js-confirm-error");

if (!confirmError) {
  throw new Error("Confirm error element not found");
}

const userInfo =
  document.querySelector<HTMLElement>(".js-user-info");

if (!userInfo) {
  throw new Error("User info element not found");
}

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

    errorEl.textContent =
      !value || !regex.test(value)
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
