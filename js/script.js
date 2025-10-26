// js/script.js
// Module entry point. All storage access is guarded and DOM access waits for DOMContentLoaded.

function safeSetItem(key, value) {
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
  } catch (err) {
    // storage not available (file://, private window, blocked by extension)
    console.warn("localStorage not available", err);
  }
}

function safeGetItem(key) {
  try {
    if (typeof localStorage !== "undefined") return localStorage.getItem(key);
  } catch (err) {
    console.warn("localStorage not available", err);
  }
  return null;
}

// Wait for DOM ready
window.addEventListener("DOMContentLoaded", () => {
  // --- Basic component helpers (self-contained so imports not required) ---
  function createButton(label, type) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = `btn-${type}`;
    btn.addEventListener("click", () => showToast(`${label} button clicked!`));
    // mouse hover visual handled by CSS; no storage here
    return btn;
  }

  function createInput(placeholder) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;

    input.addEventListener("blur", () => {
      if (!input.value) input.style.borderColor = "red";
      else input.style.borderColor = "#ccc";
    });

    return input;
  }

  function createCard(title, content) {
    const card = document.createElement("div");
    card.className = "card";
    const h = document.createElement("h4");
    h.textContent = title;
    const p = document.createElement("p");
    p.textContent = content;
    card.appendChild(h);
    card.appendChild(p);
    return card;
  }

  // Toast implementation (safe, no storage)
  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      // minimal styles so it appears even without extra CSS
      container.style.position = "fixed";
      container.style.right = "20px";
      container.style.bottom = "20px";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "10px";
      container.style.zIndex = 2000;
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.background =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-color"
      ) || "#4f46e5";
    toast.style.color = "#fff";
    toast.style.padding = ".6rem 1rem";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 2px 6px rgba(0,0,0,.2)";
    container.appendChild(toast);
    setTimeout(() => {
      try {
        container.removeChild(toast);
      } catch (e) {}
    }, 3000);
  }

  // Modal component with platform adaptation and keyboard handling
  function createModal(contentText) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const isMobile = window.innerWidth <= 600;
    modal.classList.add(isMobile ? "mobile" : "desktop");

    const content = document.createElement("p");
    content.textContent = contentText;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", closeModal);

    modal.appendChild(content);
    modal.appendChild(closeBtn);

    const openBtn = document.createElement("button");
    openBtn.textContent = "Open Modal";
    openBtn.addEventListener("click", () => {
      modal.classList.add("show");
      overlay.classList.add("show");
      closeBtn.focus();
    });

    function closeModal() {
      modal.classList.remove("show");
      overlay.classList.remove("show");
      openBtn.focus();
    }

    overlay.addEventListener("click", closeModal);

    // Esc key listener (scoped)
    function onKeyDown(e) {
      if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    }
    document.addEventListener("keydown", onKeyDown);

    const wrapper = document.createElement("div");
    wrapper.appendChild(openBtn);
    wrapper.appendChild(overlay);
    wrapper.appendChild(modal);
    return wrapper;
  }

  // Simple navbar
  function createNavbar() {
    const nav = document.createElement("div");
    ["Home", "Components", "Documentation", "Playground"].forEach((text) => {
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

  // Documentation (token table)
  function createDocumentation() {
    const doc = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = "Design Tokens & Usage Examples";
    doc.appendChild(heading);

    const colors = [
      { name: "--primary-color", value: "#716dc5d0" },
      { name: "--secondary-color", value: "#82cdf9" },
      { name: "--bg-light", value: "#f9fafb" },
      { name: "--bg-dark", value: "#1f2937" },
    ];

    const table = document.createElement("table");
    table.className = "token-table";
    table.innerHTML = "<tr><th>Token</th><th>Preview</th><th>Value</th></tr>";
    colors.forEach((c) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${c.name}</td><td><span class="token-preview" style="background:${c.value}"></span></td><td>${c.value}</td>`;
      table.appendChild(row);
    });
    doc.appendChild(table);

    const snippetHeading = document.createElement("h4");
    snippetHeading.textContent = "Button Usage Example:";
    const pre = document.createElement("pre");
    pre.textContent = `<button class="btn-primary">Primary</button>`;
    doc.appendChild(snippetHeading);
    doc.appendChild(pre);
    return doc;
  }

  // --- Hook up UI to DOM ---
  const themeToggle = document.getElementById("themeToggle");

  // Restore theme safely
  const savedTheme = safeGetItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const dark = themeToggle.checked;
      document.body.classList.toggle("dark-mode", dark);
      safeSetItem("theme", dark ? "dark" : "light");
    });
  }

  // Render components
  const buttonsSection = document.getElementById("buttons-section");
  if (buttonsSection) {
    buttonsSection.appendChild(createButton("Primary", "primary"));
    buttonsSection.appendChild(createButton("Secondary", "secondary"));
    buttonsSection.appendChild(createButton("Ghost", "ghost"));
  }

  const inputsSection = document.getElementById("inputs-section");
  if (inputsSection) inputsSection.appendChild(createInput("Enter text..."));

  const cardsSection = document.getElementById("cards-section");
  if (cardsSection)
    cardsSection.appendChild(
      createCard("Card Title", "This is a responsive card content.")
    );

  const modalsSection = document.getElementById("modals-section");
  if (modalsSection)
    modalsSection.appendChild(createModal("This is a modal example"));

  const navbar = document.getElementById("navbar");
  if (navbar) navbar.appendChild(createNavbar());

  // Add documentation
  const docSection = document.createElement("section");
  docSection.id = "documentation-section";
  docSection.appendChild(createDocumentation());
  const main = document.querySelector("main");
  if (main) main.appendChild(docSection);
}); // DOMContentLoaded end
