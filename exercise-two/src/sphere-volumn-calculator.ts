document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>("#MyForm");
  const radiusInput = document.querySelector<HTMLInputElement>("#radius");
  const volumeInput = document.querySelector<HTMLInputElement>("#volume");

  if (!form || !radiusInput || !volumeInput) {
    console.error("Required DOM elements not found");
    return;
  }

  const handleSubmit = createSubmitHandler(radiusInput, volumeInput);
  form.addEventListener("submit", handleSubmit);
});

function createSubmitHandler(
  radiusInput: HTMLInputElement,
  volumeInput: HTMLInputElement
) {
  return (event: SubmitEvent) => {
    event.preventDefault();

    const radius = Number(radiusInput.value.trim());

    if (!isValidRadius(radius)) {
      alert("Invalid radius");
      return;
    }

    volumeInput.value = calculateSphereVolume(radius).toFixed(4);
  };
}

function isValidRadius(radius: number): boolean {
  return Number.isFinite(radius) && radius > 0;
}

function calculateSphereVolume(radius: number): number {
  return (4 / 3) * Math.PI * radius ** 3;
}
