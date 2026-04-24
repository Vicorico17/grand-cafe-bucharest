const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const historyDialog = document.querySelector("[data-history-dialog]");
const historyOpenButtons = Array.from(document.querySelectorAll("[data-history-open]"));
const historyCloseButtons = Array.from(document.querySelectorAll("[data-history-close]"));
let lastHistoryTrigger = null;

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

const setHistoryDialog = (isOpen) => {
  if (!historyDialog) return;

  historyDialog.hidden = !isOpen;
  document.body.classList.toggle("history-open", isOpen);
  historyOpenButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });

  if (isOpen) {
    historyCloseButtons[0]?.focus();
    return;
  }

  lastHistoryTrigger?.focus();
};

historyOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastHistoryTrigger = button;
    setHistoryDialog(true);
  });
});

historyCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setHistoryDialog(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && historyDialog instanceof HTMLElement && !historyDialog.hidden) {
    setHistoryDialog(false);
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
