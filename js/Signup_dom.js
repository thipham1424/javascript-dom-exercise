const signupForm = document.querySelector(".js-signup-form");

const emailInput = document.querySelector(".js-email");

const usernameInput = document.querySelector(".js-username");

const passwordInput = document.querySelector(".js-password");

const confirmPasswordInput = document.querySelector(".js-confirm-password");

const emailError = document.querySelector(".js-email-error");

const usernameError = document.querySelector(".js-username-error");

const passwordError = document.querySelector(".js-password-error");

const confirmError = document.querySelector(".js-confirm-error");

// Email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username:
const usernameRegex = /^\S(.*\S)?$/;

// Password:
const passwordRegex = /^(?=.*[^A-Za-z]).{8,}$/;

function validateInput(inputElement, errorElement, regex, errorMessage) {
  input.addEventListener("input", () => {
    const value = inputElement.value;

    if (value.trim() !== "" && regex.test(value)) {
      errorElement.innerHTML = "";
    } else {
      errorElement.innerHTML = errorMessage;
    }
  });
}

// EMAIL
validateInput(
  emailInput,
  emailError,
  emailRegex,
  `
  Email address empty or wrong format.
  example: usename.@somewhere.sth
`,
);

// USERNAME
validateInput(
  usernameInput,
  usernameError,
  usernameRegex,
  `
  Please enter the correct format
  for Username.
  (No leading or trailing spaces)
`,
);

// PASSWORD
validateInput(
  passwordInput,
  passwordError,
  passwordRegex,
  `
  Please enter the correct format
  for password.
  (8 characters at least one non-letter)
`,
);

// CONFIRM PASSWORD
validateInput(
  confirmPasswordInput,
  confirmError,
  passwordRegex,
  `
  Please enter the correct format
  for confirm password.
  (8 characters at least one non-letter)
`,
);

function validateForm(event) {
  event.preventDefault();

  const email = emailInput.value;

  const username = usernameInput.value;

  const password = passwordInput.value;

  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword !== password) {
    confirmError.innerHTML = `
      Make sure password and
      confirm passwords match
    `;

    return;
  }

  const isEmailValid = emailRegex.test(email);

  const isUsernameValid = usernameRegex.test(username);

  const isPasswordValid = passwordRegex.test(password);

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

  document.querySelector(".js-user-info").innerHTML = resultHTML;
}

signupForm.addEventListener("submit", validateForm);

signupForm.addEventListener("reset", function () {
  // Delay để browser reset input trước
  setTimeout(function () {
    emailError.innerHTML = `
        Email address empty or wrong format.
        example: username@somewhere.sth
      `;

    usernameError.innerHTML = `
        Please enter the correct format
        for Username.
        (No leading or trailing spaces)
      `;

    passwordError.innerHTML = `
        Please enter the correct format
        for password.
        (8 characters at least one non-letter)
      `;

    confirmError.innerHTML = `
        Please enter the correct format
        for confirm password.
        (8 characters at least one non-letter)
      `;

    // Clear user info
    document.querySelector(".js-user-info").innerHTML = "";
  }, 0);
});
