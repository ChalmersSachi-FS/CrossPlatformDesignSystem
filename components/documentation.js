export function createDocumentation() {
  const doc = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = "Design Tokens & Usage Examples";
  doc.appendChild(heading);

  // Colors table
  const colors = [
    { name: "--primary-color", value: "#4f46e5" },
    { name: "--secondary-color", value: "#10b981" },
    { name: "--bg-light", value: "#f9fafb" },
    { name: "--bg-dark", value: "#1f2937" },
    { name: "--text-light", value: "#111827" },
    { name: "--text-dark", value: "#f9fafb" },
  ];

  const colorTable = document.createElement("table");
  colorTable.className = "token-table";
  colorTable.innerHTML = `<tr><th>Token</th><th>Preview</th><th>Value</th></tr>`;
  colors.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${c.name}</td>
                         <td><span class="token-preview" style="background-color:${c.value}"></span></td>
                         <td>${c.value}</td>`;
    colorTable.appendChild(row);
  });
  doc.appendChild(colorTable);

  // Example usage snippet
  const snippetHeading = document.createElement("h4");
  snippetHeading.textContent = "Button Usage Example:";
  const codeSnippet = document.createElement("pre");
  codeSnippet.textContent = `<button class="btn-primary">Primary</button>`;
  doc.appendChild(snippetHeading);
  doc.appendChild(codeSnippet);

  return doc;
}
