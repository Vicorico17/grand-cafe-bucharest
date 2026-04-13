const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const reservationForm = document.querySelector(".reservation-form");
const formNote = document.querySelector(".form-note");
const menuButton = document.querySelector(".menu-button");
const fullMenu = document.querySelector("#full-menu");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  }
});

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(reservationForm);
  const name = String(formData.get("name") || "Guest").trim();
  formNote.textContent = `Thank you, ${name}. The reservations team will confirm your request shortly.`;
  reservationForm.reset();
});

menuButton?.addEventListener("click", () => {
  if (!fullMenu) {
    return;
  }

  const isOpen = fullMenu.toggleAttribute("hidden");
  const isExpanded = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isExpanded));
  menuButton.textContent = isExpanded ? "Hide full menu" : "View full menu";
});
