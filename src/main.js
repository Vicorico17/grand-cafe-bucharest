const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const menuButton = document.querySelector(".menu-button");
const fullMenu = document.querySelector("#full-menu");
const timelineShell = document.querySelector(".timeline-shell");
const timelineItems = document.querySelectorAll(".timeline-item");

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

menuButton?.addEventListener("click", () => {
  if (!fullMenu) {
    return;
  }

  const isOpen = fullMenu.toggleAttribute("hidden");
  const isExpanded = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isExpanded));
  menuButton.textContent = isExpanded ? "Hide the full menu" : "Show the full menu";
});

if (timelineShell && timelineItems.length > 0) {
  timelineItems[0].classList.add("is-active");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      const activeEntry = visibleEntries[0];

      if (!activeEntry) {
        return;
      }

      timelineItems.forEach((item) => item.classList.remove("is-active"));
      activeEntry.target.classList.add("is-active");
    },
    {
      root: timelineShell,
      threshold: [0.35, 0.55, 0.75],
    }
  );

  timelineItems.forEach((item) => timelineObserver.observe(item));
}
