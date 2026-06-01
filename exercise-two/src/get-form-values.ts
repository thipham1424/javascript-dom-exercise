document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>("#form1");

  if (!form) {
    console.error("Form #form1 not found");
    return;
  }

  form.addEventListener("submit", handleSubmit);
});

function handleSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const data = Object.fromEntries(
    new FormData(form).entries()
  );

  console.log("Form data:", data);
}
