const insertBtn = document.getElementById("insertBtn");

if (insertBtn) {
  insertBtn.addEventListener("click", insertRow);
}

function insertRow(): void {
  const tableElement = document.getElementById("sampleTable");

  if (!(tableElement instanceof HTMLTableElement)) {
    return;
  }

  const newRow = tableElement.insertRow();
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);

  const rowNumber = tableElement.rows.length;

  cell1.textContent = `Row${rowNumber} cell1`;
  cell2.textContent = `Row${rowNumber} cell2`;
}