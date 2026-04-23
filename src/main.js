const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

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

const timelineTriggers = Array.from(document.querySelectorAll(".timeline-trigger"));

timelineTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panelId = trigger.getAttribute("aria-controls");
    if (!panelId) return;

    const panel = document.getElementById(panelId);
    if (!panel) return;

    const isOpening = trigger.getAttribute("aria-expanded") !== "true";

    timelineTriggers.forEach((otherTrigger) => {
      const otherPanelId = otherTrigger.getAttribute("aria-controls");
      if (!otherPanelId) return;

      const otherPanel = document.getElementById(otherPanelId);
      otherTrigger.setAttribute("aria-expanded", "false");
      otherTrigger.closest(".timeline-item")?.classList.remove("is-open");

      if (otherPanel) {
        otherPanel.hidden = true;
      }
    });

    if (isOpening) {
      trigger.setAttribute("aria-expanded", "true");
      trigger.closest(".timeline-item")?.classList.add("is-open");
      panel.hidden = false;
    }
  });
});
