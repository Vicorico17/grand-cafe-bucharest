const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const historyDialog = document.querySelector("[data-history-dialog]");
const historyOpenButtons = Array.from(document.querySelectorAll("[data-history-open]"));
const historyCloseButtons = Array.from(document.querySelectorAll("[data-history-close]"));
const reserveDialog = document.querySelector("[data-reserve-dialog]");
const reserveOpenButtons = Array.from(document.querySelectorAll("[data-reserve-open]"));
const reserveCloseButtons = Array.from(document.querySelectorAll("[data-reserve-close]"));
const reserveForm = document.querySelector("[data-reserve-form]");
const reserveSuccess = document.querySelector("[data-reserve-success]");
const reserveSummary = document.querySelector("[data-reserve-summary]");
const reserveResetButton = document.querySelector("[data-reserve-reset]");
let lastHistoryTrigger = null;
let lastReserveTrigger = null;

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

const setReserveDialog = (isOpen) => {
  if (!reserveDialog) return;

  reserveDialog.hidden = !isOpen;
  document.body.classList.toggle("reserve-open", isOpen);
  reserveOpenButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });

  if (isOpen) {
    reserveCloseButtons[0]?.focus();
    return;
  }

  lastReserveTrigger?.focus();
};

reserveOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastReserveTrigger = button;
    setReserveDialog(true);
  });
});

reserveCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setReserveDialog(false);
  });
});

reserveForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(reserveForm);
  const name = String(formData.get("guest_name") || "Guest");
  const date = String(formData.get("date") || "your selected date");
  const time = String(formData.get("time") || "your selected time");
  const guests = String(formData.get("guests") || "your party");
  const service = String(formData.get("service") || "your chosen service");

  if (reserveSummary) {
    reserveSummary.textContent = `${name}, your mock reservation is set for ${guests} on ${date} at ${time} for ${service}. A host would follow up with a confirmation note and table details.`;
  }

  reserveForm.hidden = true;
  if (reserveSuccess) {
    reserveSuccess.hidden = false;
  }
});

reserveResetButton?.addEventListener("click", () => {
  reserveForm?.reset();
  if (reserveForm) {
    reserveForm.hidden = false;
  }
  if (reserveSuccess) {
    reserveSuccess.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && historyDialog instanceof HTMLElement && !historyDialog.hidden) {
    setHistoryDialog(false);
  }

  if (event.key === "Escape" && reserveDialog instanceof HTMLElement && !reserveDialog.hidden) {
    setReserveDialog(false);
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
