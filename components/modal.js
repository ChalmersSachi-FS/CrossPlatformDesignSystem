export function createModal(contentText) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  // Platform detection
  const isMobile = window.innerWidth <= 600;
  modal.classList.add(isMobile ? "mobile" : "desktop");

  const content = document.createElement("p");
  content.textContent = contentText;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", closeModal);

  modal.appendChild(content);
  modal.appendChild(closeBtn);

  // Open button
  const openBtn = document.createElement("button");
  openBtn.textContent = "Open Modal";
  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
    overlay.classList.add("show");
    closeBtn.focus();
  });

  // Close modal function
  function closeModal() {
    modal.classList.remove("show");
    overlay.classList.remove("show");
    openBtn.focus();
  }

  // Close on overlay click
  overlay.addEventListener("click", closeModal);

  // Close on Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const wrapper = document.createElement("div");
  wrapper.appendChild(openBtn);
  wrapper.appendChild(overlay);
  wrapper.appendChild(modal);

  return wrapper;
}
