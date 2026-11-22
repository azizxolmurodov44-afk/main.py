const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const filters = document.querySelectorAll(".filter");
const requestCards = document.querySelectorAll(".request-card");
const publicRequestForm = document.querySelector("#public-request-form");
const formStatus = document.querySelector("#form-status");

year.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Menyuni yopish" : "Menyuni ochish",
  );
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;

    requestCards.forEach((card) => {
      const matches =
        value === "all" ||
        (value === "urgent" && card.dataset.urgent === "true") ||
        card.dataset.type === value;
      card.classList.toggle("hidden", !matches);
    });
  });
});

publicRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(publicRequestForm);
  formStatus.textContent =
    `${data.get("region")} hududi uchun ${data.get("bloodType")} guruhli ${data.get("urgency").toLowerCase()} demo e'loni tayyorlandi.`;
  publicRequestForm.reset();
});
