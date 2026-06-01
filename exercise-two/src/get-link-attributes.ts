document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector<HTMLButtonElement>("#btn");

  if (!btn) {
    console.error("Button #btn not found");
    return;
  }

  btn.addEventListener("click", showLinkInfo);
});

function showLinkInfo(): void {
  const link = document.querySelector<HTMLAnchorElement>("#w3r");

  if (!link) {
    console.error("Link #w3r not found");
    return;
  }

  const info = {
    href: link.href,
    hreflang: link.hreflang,
    rel: link.rel,
    target: link.target,
    type: link.getAttribute("type") ?? "",
  };

  console.table(info);

  alert(
    `Href: ${info.href}
Hreflang: ${info.hreflang}
Rel: ${info.rel}
Target: ${info.target}
Type: ${info.type}`,
  );
}
