const getOptionBtn = document.getElementById("getOptionBtn");

getOptionBtn?.addEventListener("click", showItemsInfo);

function showItemsInfo(): void {
  const select = document.getElementById("colorSelect");

  if (!(select instanceof HTMLSelectElement)) {
    return;
  }

  const count = select.options.length;

  if (count === 0) {
    alert("The list is empty");
    return;
  }

  const items = [...select.options].map((option) => option.text);

  alert(`Number of items: ${count}\nItems: ${items.join(", ")}`);
}
