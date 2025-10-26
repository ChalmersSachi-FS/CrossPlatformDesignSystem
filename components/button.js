import { showToast } from "./toast.js";

export function createButton(label, type) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = `btn-${type} fade-in`;
  btn.addEventListener("click", () => showToast(`${label} button clicked!`));
  return btn;
}
