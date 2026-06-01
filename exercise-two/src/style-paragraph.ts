function applyTextStyle(): void {
  const p = document.querySelector("#text");

  if (!(p instanceof HTMLElement)) return;

  p.style.color = "blue";
  p.style.fontSize = "3rem";
  p.style.fontFamily = "Brush Script MT";
}
