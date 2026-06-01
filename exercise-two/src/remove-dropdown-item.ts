document.addEventListener("DOMContentLoaded", () => {
  const removeButton = document.querySelector<HTMLButtonElement>("#removeBtn");
  const colorSelect = document.querySelector<HTMLSelectElement>("#colorSelect");

  if (!removeButton || !colorSelect) {
    console.error("Required DOM elements not found");
    return;
  }

  removeButton.addEventListener("click", () =>
    removeSelectedOption(colorSelect)
  );
});

function removeSelectedOption(colorSelect: HTMLSelectElement): void {
  if (colorSelect.options.length === 0) {
    alert("The list is empty");
    return;
  }

  if (colorSelect.selectedIndex === -1) {
    alert("Please select an item to remove");
    return;
  }

  colorSelect.remove(colorSelect.selectedIndex);
}
