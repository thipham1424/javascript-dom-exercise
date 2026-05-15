const signupForm = document.querySelector(
  ".js-signup-form"
);

const emailInput = document.querySelector(
  ".js-email"
);

const usernameInput = document.querySelector(
  ".js-username"
);

const passwordInput = document.querySelector(
  ".js-password"
);

const confirmPasswordInput = document.querySelector(
  ".js-confirm-password"
);

const emailError = document.querySelector(
  ".js-email-error"
);

const usernameError = document.querySelector(
  ".js-username-error"
);

const passwordError = document.querySelector(
  ".js-password-error"
);

const confirmError = document.querySelector(
  ".js-confirm-error"
);

// Email format
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username:
const usernameRegex =
  /^\S(.*\S)?$/;

// Password:
const passwordRegex =
  /^(?=.*[^A-Za-z]).{8,}$/;

// EMAIL
emailInput.addEventListener(
  "input",
  function () {

    const email = emailInput.value;

    if (
      email.trim() !== ""
      &&
      emailRegex.test(email)
    ) {

      emailError.innerHTML = "";
    }

    else {

      emailError.innerHTML = `
        Email address empty or wrong format.
        example: username@somewhere.sth
      `;
    }
  }
);

// USERNAME
usernameInput.addEventListener(
  "input",
  function () {

    const username = usernameInput.value;

    if (
      username.trim() !== ""
      &&
      usernameRegex.test(username)
    ) {

      usernameError.innerHTML = "";
    }

    else {

      usernameError.innerHTML = `
        Please enter the correct format
        for Username.
        (No leading or trailing spaces)
      `;
    }
  }
);

// PASSWORD
passwordInput.addEventListener(
  "input",
  function () {

    const password = passwordInput.value;

    if (
      passwordRegex.test(password)
    ) {

      passwordError.innerHTML = "";
    }

    else {

      passwordError.innerHTML = `
        Please enter the correct format
        for password.
        (8 characters at least one non-letter)
      `;
    }
  }
);

// CONFIRM PASSWORD
confirmPasswordInput.addEventListener(
  "input",
  function () {

    const confirmPassword = confirmPasswordInput.value;

    if (
      passwordRegex.test(confirmPassword)
    ) {

      confirmError.innerHTML = "";
    }

    else {

      confirmError.innerHTML = `
        Please enter the correct format
        for confirm password.
        (8 characters at least one non-letter)
      `;
    }
  }
);

function validateForm(event) {

  event.preventDefault();

  const email = emailInput.value;

  const username = usernameInput.value;

  const password = passwordInput.value;

  const confirmPassword =
    confirmPasswordInput.value;

  if (
    confirmPassword !== password
  ) {

    confirmError.innerHTML = `
      Make sure password and
      confirm passwords match
    `;

    return;
  }

  // Clear confirm error
  confirmError.innerHTML = "";

  if (
    emailError.innerHTML !== ""
    ||
    usernameError.innerHTML !== ""
    ||
    passwordError.innerHTML !== ""
  ) {

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

  document.querySelector(
    ".js-user-info"
  ).innerHTML = resultHTML;
}

signupForm.addEventListener(
  "submit",
  validateForm
);

signupForm.addEventListener(
  "reset",
  function () {

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
      document.querySelector(
        ".js-user-info"
      ).innerHTML = "";

    }, 0);
  }
);