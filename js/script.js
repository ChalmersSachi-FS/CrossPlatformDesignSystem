import { createButton } from "../components/button.js";
import { createInput } from "../components/input.js";
import { createCard } from "../components/card.js";
import { createModal } from "../components/modal.js";
import { createNavbar } from "../components/navbar.js";
import { createDocumentation } from "../components/documentation.js";
import { showToast } from "../components/toast.js";

// Safe localStorage access
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn("localStorage not available", err);
  }
}

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.warn("localStorage not available", err);
    return null;
  }
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  safeSetItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// Apply saved theme
if (safeGetItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

// Render Components
const buttonsSection = document.getElementById("buttons-section");
buttonsSection.appendChild(createButton("Primary", "primary"));
buttonsSection.appendChild(createButton("Secondary", "secondary"));
buttonsSection.appendChild(createButton("Ghost", "ghost"));

const inputsSection = document.getElementById("inputs-section");
inputsSection.appendChild(createInput("Enter text..."));

const cardsSection = document.getElementById("cards-section");
cardsSection.appendChild(
  createCard("Card Title", "This is a responsive card content.")
);

const modalsSection = document.getElementById("modals-section");
modalsSection.appendChild(createModal("This is a modal example"));

const navbar = document.getElementById("navbar");
navbar.appendChild(createNavbar());

// Add documentation section
const docSection = document.createElement("section");
docSection.id = "documentation-section";
docSection.appendChild(createDocumentation());
document.querySelector("main").appendChild(docSection);
