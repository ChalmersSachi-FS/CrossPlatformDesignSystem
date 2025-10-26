export function createNavbar() {
  const nav = document.createElement("div");

  const links = ["Home", "Components", "Documentation", "Playground"];
  links.forEach((text) => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    a.style.margin = "0 10px";
    a.style.color = "white";
    a.style.textDecoration = "none";
    nav.appendChild(a);
  });

  return nav;
}
