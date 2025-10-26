export function createInput(placeholder) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;

  // Basic validation: show red border if empty
  input.addEventListener("blur", () => {
    if (!input.value) input.style.borderColor = "red";
    else input.style.borderColor = "#ccc";
  });

  return input;
}
