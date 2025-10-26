export function createCard(title, content) {
  const card = document.createElement("div");
  card.className = "card fade-in";

  // Skeleton loader
  const skeleton = document.createElement("div");
  skeleton.className = "skeleton";
  card.appendChild(skeleton);

  // Simulate loading
  setTimeout(() => {
    card.removeChild(skeleton);
    const cardTitle = document.createElement("h4");
    cardTitle.textContent = title;
    const cardContent = document.createElement("p");
    cardContent.textContent = content;

    card.appendChild(cardTitle);
    card.appendChild(cardContent);
  }, 1000); // 1 second loading delay

  return card;
}
