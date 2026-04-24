const LANGUAGE_KEY = "gcb-language";

const navToggle = document.querySelector("#nav-toggle");
const siteNav = document.querySelector("#site-nav");
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
const languageButtons = Array.from(document.querySelectorAll("[data-lang-switch]"));

let lastHistoryTrigger = null;
let lastReserveTrigger = null;
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";

const translations = {
  en: {
    htmlLang: "en",
    title: "Grand Cafe Bucharest",
    metaDescription:
      "Grand Cafe Bucharest, opening in the historic Monteoru Palace on Calea Victoriei in Bucharest.",
    brandAriaLabel: "Grand Cafe Bucharest home",
    navToggleOpen: "Open menu",
    navToggleClose: "Close menu",
    texts: {
      "nav-home": "Home",
      "nav-history": "History",
      "nav-menu": "Menu",
      "nav-reserve": "Reserve",
      "nav-contact": "Contact",
      "hero-eyebrow": "Opening soon on Calea Victoriei",
      "hero-title": "Grand Cafe Bucharest",
      "hero-copy":
        "A new cafe and dining room inside the old Monteoru Palace, bringing breakfast, coffee, dinner, and late conversation to one of Bucharest's most beautiful addresses.",
      "hero-reserve-label": "Reserve",
      "hero-menu-label": "Menu",
      "hero-history-label": "Learn History",
      "intro-address": "Calea Victoriei",
      "intro-year": "Monteoru House completed",
      "intro-now": "A grand cafe for Bucharest",
      "history-eyebrow": "History",
      "history-title": "A house with more than one life.",
      "history-copy":
        "Casa Monteoru began as a private residence, became one of Calea Victoriei's great interiors, passed through the upheavals of the twentieth century, and returned to public cultural life.",
      "history-feature-tag": "Immersive feature",
      "history-feature-title": "Learn the full Monteoru story.",
      "history-feature-copy":
        "Open a dedicated history experience with the complete timeline, archival moments, and the next chapter for Grand Cafe Bucharest.",
      "history-feature-button": "Learn History",
      "history-feature-note":
        "A guided archive of Casa Monteoru, from private residence to grand cafe.",
      "history-portal-eyebrow": "History Experience",
      "history-experience-title": "Casa Monteoru, year by year.",
      "history-close-label": "Close",
      "history-portal-copy":
        "Follow the building from 1874 to now. Tap a year to open each chapter.",
      "history-1874-title": "Built for Alecu Niculescu",
      "history-1874-copy":
        "The house is completed on Calea Victoriei, then one of Bucharest's defining addresses for private residences and urban society.",
      "history-1883-title": "Grigore C. Monteoru takes ownership",
      "history-1883-copy":
        "The property is bought by Grigore Constantinescu-Monteoru, a liberal politician, landowner, and founder of the Sarata Monteoru resort.",
      "history-1887-title": "A radical transformation begins",
      "history-1887-copy":
        "Architect Nicolae Cutarida files plans for new openings, floors, railings, wallpapers, stoves, and the main staircase. Ion Mincu is also tied to the restoration.",
      "history-1889-title": "The French eclectic interior is finished",
      "history-1889-copy":
        "The rooms receive painted stucco ceilings, rare wood paneling, a monumental stair, French silk wall coverings, and Paris-made furniture.",
      "history-1898-title": "The garden gains new sculpture",
      "history-1898-copy":
        "Additional statues by Ion Georgescu and Ion Valbudea join the sculptures Monteoru brought from Greece, marking agriculture and Romanian industry.",
      "history-1917-title": "War leaves absences",
      "history-1917-copy":
        "The two later garden statues disappear during the First World War years, becoming part of the house's interrupted story.",
      "history-1923-title": "The Polish Legation takes residence",
      "history-1923-copy":
        "After the First World War, the house briefly serves as the Polish Legation before returning to the Monteoru-Catargi family.",
      "history-1945-title": "The postwar transfer begins",
      "history-1945-copy":
        "Elena Lascar Catargi, Grigore Monteoru's daughter, is reported to have ceded the property under pressure in the postwar Soviet context.",
      "history-1949-title": "The house is nationalized",
      "history-1949-copy":
        "In the communist period, the property leaves the family's possession and is absorbed into the new state system.",
      "history-1952-title": "The Writers' Union moves in",
      "history-1952-copy":
        "After nationalization, Casa Monteoru becomes the headquarters of the Romanian Writers' Union and remains a literary address for decades.",
      "history-2013-title": "The heirs regain the building",
      "history-2013-copy":
        "Court decisions return the property to the rightful heirs, and the Writers' Union leaves Casa Monteoru.",
      "history-now-title": "Grand Cafe Bucharest opens the next chapter",
      "history-now-copy":
        "The house returns to daily life on Calea Victoriei as a place for dining, conversation, and evenings shaped by the building's historic rooms.",
      "menu-eyebrow": "Menu",
      "menu-title": "Grand cafe classics, all day.",
      "menu-copy":
        "Breakfast, coffee, lunch, dinner, and a late bar list shaped for Calea Victoriei: familiar dishes, polished service, and a few Romanian notes throughout the day.",
      "menu-service-title": "Opening Service",
      "menu-service-copy":
        "Morning coffee and pastry, a la carte lunch, dinner service, and classic cocktails in the evening.",
      "menu-button-label": "Show the full menu",
      "menu-figcaption": "Coffee and croissant service",
      "reserve-eyebrow": "Reserve",
      "reserve-title": "Book for the opening season.",
      "reserve-copy": "Join the first tables at Grand Cafe Bucharest for the opening season.",
      "reserve-button-label": "Reserve",
      "reservation-eyebrow": "Reservation Experience",
      "reservation-experience-title": "Choose your table, service, and hour.",
      "reservation-copy":
        "A mock booking flow for Grand Cafe Bucharest, shaped like a concierge moment rather than a generic form.",
      "reservation-highlight-1-title": "Morning Room",
      "reservation-highlight-1-copy": "Pastry, coffee, early light.",
      "reservation-highlight-2-title": "Dining Salon",
      "reservation-highlight-2-copy": "Lunch and dinner under the historic ceilings.",
      "reservation-highlight-3-title": "Late Aperitif",
      "reservation-highlight-3-copy": "Cocktails, dessert, and a slower table.",
      "reservation-close-label": "Close",
      "reservation-label-name": "Guest name",
      "reservation-label-date": "Date",
      "reservation-label-time": "Time",
      "reservation-option-time-empty": "Select",
      "reservation-label-guests": "Guests",
      "reservation-option-guests-empty": "Select",
      "reservation-option-guests-2": "2 guests",
      "reservation-option-guests-4": "4 guests",
      "reservation-option-guests-6": "6 guests",
      "reservation-option-guests-8": "8 guests",
      "reservation-label-service": "Service",
      "reservation-service-1": "Breakfast room",
      "reservation-service-2": "Lunch salon",
      "reservation-service-3": "Dinner salon",
      "reservation-service-4": "Late aperitif",
      "reservation-label-notes": "Notes",
      "reservation-submit-label": "Confirm mock reservation",
      "reservation-success-eyebrow": "Reserved",
      "reservation-success-title": "Your table is held.",
      "reservation-reset-label": "Book another table",
      "contact-eyebrow": "Contact",
      "contact-title": "Find us in the heart of Bucharest.",
      "contact-address-title": "Address",
      "contact-opening-title": "Opening",
      "contact-opening-copy": "Reservations list now open<br>Daily service coming soon",
      "contact-reach-title": "Reach us",
    },
    placeholders: {
      "reservation-input-name": "Ana Ionescu",
      "reservation-input-notes": "Window table, anniversary, quiet corner...",
    },
    ariaLabels: {
      "history-close": "Close history experience",
      "reservation-close": "Close reservation experience",
      "hero-image": "Casa Monteoru on Calea Victoriei in Bucharest",
    },
    serviceValues: ["Breakfast room", "Lunch salon", "Dinner salon", "Late aperitif"],
    summary: (details) =>
      `${details.name}, your mock reservation is set for ${details.guests} on ${details.date} at ${details.time} for ${details.service}. A host would follow up with a confirmation note and table details.`,
    defaults: {
      name: "Guest",
      date: "your selected date",
      time: "your selected time",
      guests: "your party",
      service: "your chosen service",
    },
  },
  ro: {
    htmlLang: "ro",
    title: "Grand Cafe Bucharest",
    metaDescription:
      "Grand Cafe Bucharest se deschide în istorica Casă Monteoru de pe Calea Victoriei din București.",
    brandAriaLabel: "Grand Cafe Bucharest acasă",
    navToggleOpen: "Deschide meniul",
    navToggleClose: "Închide meniul",
    texts: {
      "nav-home": "Acasă",
      "nav-history": "Poveste",
      "nav-menu": "Meniu",
      "nav-reserve": "Rezervă",
      "nav-contact": "Contact",
      "hero-eyebrow": "În curând pe Calea Victoriei",
      "hero-title": "Grand Cafe Bucharest",
      "hero-copy":
        "O nouă cafenea și sală de dining în vechiul Palat Monteoru, cu mic dejun, cafea, cină și conversații târzii într-una dintre cele mai frumoase adrese din București.",
      "hero-reserve-label": "Rezervă",
      "hero-menu-label": "Meniu",
      "hero-history-label": "Descoperă povestea",
      "intro-address": "Calea Victoriei",
      "intro-year": "Casa Monteoru finalizată",
      "intro-now": "Un grand cafe pentru București",
      "history-eyebrow": "Poveste",
      "history-title": "O casă cu mai multe vieți.",
      "history-copy":
        "Casa Monteoru a început ca reședință privată, a devenit unul dintre marile interioare ale Căii Victoriei, a trecut prin răsturnările secolului XX și s-a întors la viața culturală publică.",
      "history-feature-tag": "Experiență imersivă",
      "history-feature-title": "Descoperă întreaga poveste Monteoru.",
      "history-feature-copy":
        "Deschide o experiență dedicată istoriei, cu cronologia completă, momente de arhivă și noul capitol Grand Cafe Bucharest.",
      "history-feature-button": "Descoperă povestea",
      "history-feature-note":
        "O arhivă ghidată a Casei Monteoru, de la reședință privată la grand cafe.",
      "history-portal-eyebrow": "Experiență istorică",
      "history-experience-title": "Casa Monteoru, an cu an.",
      "history-close-label": "Închide",
      "history-portal-copy":
        "Urmărește povestea clădirii din 1874 până astăzi. Apasă pe un an pentru a deschide fiecare capitol.",
      "history-1874-title": "Construită pentru Alecu Niculescu",
      "history-1874-copy":
        "Casa este finalizată pe Calea Victoriei, pe atunci una dintre marile adrese ale reședințelor private și ale vieții urbane bucureștene.",
      "history-1883-title": "Grigore C. Monteoru devine proprietar",
      "history-1883-copy":
        "Proprietatea este cumpărată de Grigore Constantinescu-Monteoru, politician liberal, moșier și fondator al stațiunii Sărata Monteoru.",
      "history-1887-title": "Începe o transformare radicală",
      "history-1887-copy":
        "Arhitectul Nicolae Cutarida depune planuri pentru noi deschideri, pardoseli, balustrade, tapet, sobe și scara principală. Restaurarea este legată și de Ion Mincu.",
      "history-1889-title": "Interiorul eclectic francez este finalizat",
      "history-1889-copy":
        "Încăperile primesc tavane stucco pictate, lambriuri rare din lemn, o scară monumentală, mătăsuri franceze pentru pereți și mobilier realizat la Paris.",
      "history-1898-title": "Grădina primește noi sculpturi",
      "history-1898-copy":
        "Statui suplimentare de Ion Georgescu și Ion Valbudea se alătură sculpturilor aduse de Monteoru din Grecia, marcând agricultura și industria românească.",
      "history-1917-title": "Războiul lasă absențe",
      "history-1917-copy":
        "Cele două statui adăugate mai târziu dispar în anii Primului Război Mondial, devenind parte din povestea întreruptă a casei.",
      "history-1923-title": "Legația Poloniei își stabilește sediul aici",
      "history-1923-copy":
        "După Primul Război Mondial, casa găzduiește pentru scurt timp Legația Poloniei înainte de a reveni familiei Monteoru-Catargi.",
      "history-1945-title": "Începe transferul postbelic",
      "history-1945-copy":
        "Elena Lascar Catargi, fiica lui Grigore Monteoru, ar fi cedat proprietatea sub presiune în contextul sovietic de după război.",
      "history-1949-title": "Casa este naționalizată",
      "history-1949-copy":
        "În perioada comunistă, proprietatea iese din posesia familiei și este absorbită în noul sistem de stat.",
      "history-1952-title": "Uniunea Scriitorilor se mută aici",
      "history-1952-copy":
        "După naționalizare, Casa Monteoru devine sediul Uniunii Scriitorilor din România și rămâne timp de decenii o adresă literară importantă.",
      "history-2013-title": "Moștenitorii recuperează clădirea",
      "history-2013-copy":
        "Prin hotărâri judecătorești, proprietatea este restituită moștenitorilor de drept, iar Uniunea Scriitorilor părăsește Casa Monteoru.",
      "history-now-title": "Grand Cafe Bucharest deschide următorul capitol",
      "history-now-copy":
        "Casa revine la viața cotidiană de pe Calea Victoriei ca loc pentru dining, conversație și seri modelate de încăperile sale istorice.",
      "menu-eyebrow": "Meniu",
      "menu-title": "Clasice de grand cafe, pe tot parcursul zilei.",
      "menu-copy":
        "Mic dejun, cafea, prânz, cină și un meniu de bar târziu, gândite pentru Calea Victoriei: preparate familiare, serviciu elegant și câteva note românești pe tot parcursul zilei.",
      "menu-service-title": "Serviciul de deschidere",
      "menu-service-copy":
        "Cafea și patiserie dimineața, prânz à la carte, cină și cocktailuri clasice seara.",
      "menu-button-label": "Vezi meniul complet",
      "menu-figcaption": "Cafea și croissant",
      "reserve-eyebrow": "Rezervări",
      "reserve-title": "Rezervă pentru sezonul de deschidere.",
      "reserve-copy": "Intră printre primele mese rezervate la Grand Cafe Bucharest în sezonul de deschidere.",
      "reserve-button-label": "Rezervă",
      "reservation-eyebrow": "Experiență de rezervare",
      "reservation-experience-title": "Alege masa, serviciul și ora.",
      "reservation-copy":
        "Un flux demonstrativ de rezervare pentru Grand Cafe Bucharest, gândit mai degrabă ca un moment de concierge decât ca un formular generic.",
      "reservation-highlight-1-title": "Salonul de dimineață",
      "reservation-highlight-1-copy": "Patiserie, cafea și lumină blândă.",
      "reservation-highlight-2-title": "Salonul principal",
      "reservation-highlight-2-copy": "Prânz și cină sub plafoanele istorice.",
      "reservation-highlight-3-title": "Aperitiv târziu",
      "reservation-highlight-3-copy": "Cocktailuri, desert și o masă mai lentă.",
      "reservation-close-label": "Închide",
      "reservation-label-name": "Nume invitat",
      "reservation-label-date": "Dată",
      "reservation-label-time": "Ora",
      "reservation-option-time-empty": "Selectează",
      "reservation-label-guests": "Persoane",
      "reservation-option-guests-empty": "Selectează",
      "reservation-option-guests-2": "2 persoane",
      "reservation-option-guests-4": "4 persoane",
      "reservation-option-guests-6": "6 persoane",
      "reservation-option-guests-8": "8 persoane",
      "reservation-label-service": "Serviciu",
      "reservation-service-1": "Salonul de mic dejun",
      "reservation-service-2": "Salonul de prânz",
      "reservation-service-3": "Salonul de cină",
      "reservation-service-4": "Aperitiv târziu",
      "reservation-label-notes": "Detalii",
      "reservation-submit-label": "Confirmă rezervarea demonstrativă",
      "reservation-success-eyebrow": "Rezervat",
      "reservation-success-title": "Masa ta este ținută.",
      "reservation-reset-label": "Rezervă o altă masă",
      "contact-eyebrow": "Contact",
      "contact-title": "Ne găsești în inima Bucureștiului.",
      "contact-address-title": "Adresă",
      "contact-opening-title": "Deschidere",
      "contact-opening-copy": "Lista de rezervări este deschisă<br>Serviciul zilnic urmează curând",
      "contact-reach-title": "Contactează-ne",
    },
    placeholders: {
      "reservation-input-name": "Ana Ionescu",
      "reservation-input-notes": "Masă la fereastră, aniversare, colț liniștit...",
    },
    ariaLabels: {
      "history-close": "Închide experiența istorică",
      "reservation-close": "Închide experiența de rezervare",
      "hero-image": "Casa Monteoru de pe Calea Victoriei din București",
    },
    serviceValues: [
      "Salonul de mic dejun",
      "Salonul de prânz",
      "Salonul de cină",
      "Aperitiv târziu",
    ],
    summary: (details) =>
      `${details.name}, rezervarea demonstrativă este setată pentru ${details.guests} la data de ${details.date}, ora ${details.time}, pentru ${details.service}. Un gazdă ar reveni apoi cu confirmarea finală și detaliile mesei.`,
    defaults: {
      name: "Oaspete",
      date: "data selectată",
      time: "ora selectată",
      guests: "grupul tău",
      service: "serviciul ales",
    },
  },
};

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (!node) return;

  if (value.includes("<br>")) {
    node.innerHTML = value;
    return;
  }

  node.textContent = value;
};

const setNavToggleLabel = () => {
  if (!navToggle) return;

  const copy = translations[currentLanguage];
  const isOpen = siteNav?.classList.contains("is-open");
  navToggle.setAttribute("aria-label", isOpen ? copy.navToggleClose : copy.navToggleOpen);
};

const applyLanguage = (language) => {
  currentLanguage = language === "ro" ? "ro" : "en";
  const copy = translations[currentLanguage];

  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;

  const metaDescription = document.querySelector("#meta-description");
  const ogTitle = document.querySelector("#meta-og-title");
  const ogDescription = document.querySelector("#meta-og-description");
  const brandLink = document.querySelector("#brand-link");
  const historyClose = document.querySelector("#history-close");
  const reservationClose = document.querySelector("#reservation-close");
  const heroImage = document.querySelector("#hero-image");

  if (metaDescription) metaDescription.content = copy.metaDescription;
  if (ogTitle) ogTitle.content = copy.title;
  if (ogDescription) ogDescription.content = copy.metaDescription;
  if (brandLink) brandLink.setAttribute("aria-label", copy.brandAriaLabel);
  if (historyClose) historyClose.setAttribute("aria-label", copy.ariaLabels["history-close"]);
  if (reservationClose) reservationClose.setAttribute("aria-label", copy.ariaLabels["reservation-close"]);
  if (heroImage) heroImage.setAttribute("alt", copy.ariaLabels["hero-image"]);

  Object.entries(copy.texts).forEach(([id, value]) => setText(id, value));

  Object.entries(copy.placeholders).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) input.setAttribute("placeholder", value);
  });

  const serviceInputs = Array.from(document.querySelectorAll('input[name="service"]'));
  serviceInputs.forEach((input, index) => {
    input.value = copy.serviceValues[index];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langSwitch === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  setNavToggleLabel();
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
};

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  setNavToggleLabel();
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    setNavToggleLabel();
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langSwitch || "en");
  });
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

  const copy = translations[currentLanguage];
  const formData = new FormData(reserveForm);
  const name = String(formData.get("guest_name") || copy.defaults.name);
  const date = String(formData.get("date") || copy.defaults.date);
  const time = String(formData.get("time") || copy.defaults.time);
  const guests = String(formData.get("guests") || copy.defaults.guests);
  const service = String(formData.get("service") || copy.defaults.service);

  if (reserveSummary) {
    reserveSummary.textContent = copy.summary({ name, date, time, guests, service });
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

applyLanguage(currentLanguage);
