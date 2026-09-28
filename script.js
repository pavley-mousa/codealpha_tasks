const root = document.documentElement;
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const observedSections = Array.from(document.querySelectorAll("[data-observe-section]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const progressBar = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const themeToggle = document.getElementById("theme-toggle");
const copyEmailButton = document.getElementById("copy-email");
const copyFeedback = document.getElementById("copy-feedback");
const currentYear = document.getElementById("current-year");

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenu(open) {
  navMenu.classList.toggle("active", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  navToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
  navbar.classList.toggle("scrolled", scrollTop > 20);
  backToTop.classList.toggle("visible", scrollTop > 520);
}

function updateThemeButton() {
  const light = root.dataset.theme === "light";
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.innerHTML = light
    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
}

function setTheme(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem("pavley-theme", theme);
  } catch {
    // Ignore storage failures and keep the theme for this session.
  }
  updateThemeButton();
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const success = document.execCommand("copy");
  helper.remove();

  if (!success) {
    throw new Error("Copy command failed");
  }
}

function showCopyFeedback(message, success) {
  copyFeedback.textContent = message;
  copyFeedback.classList.toggle("success", success);

  window.clearTimeout(showCopyFeedback.timer);
  showCopyFeedback.timer = window.setTimeout(() => {
    copyFeedback.textContent = "";
    copyFeedback.classList.remove("success");
  }, 2600);
}

navToggle.addEventListener("click", () => {
  setMenu(!navMenu.classList.contains("active"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("click", (event) => {
  if (!navMenu.classList.contains("active")) return;

  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = navToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotionQuery.matches ? "auto" : "smooth"
  });
});

let storedTheme = null;
try {
  storedTheme = localStorage.getItem("pavley-theme");
} catch {
  storedTheme = null;
}

if (storedTheme === "light" || storedTheme === "dark") {
  root.dataset.theme = storedTheme;
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
});

function setupReveal() {
  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupActiveSection() {
  if (!("IntersectionObserver" in window)) return;

  const linkById = new Map(
    navLinks.map((link) => [link.getAttribute("href").slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = linkById.get(entry.target.id);

        if (activeLink) {
          activeLink.classList.add("active");
          activeLink.setAttribute("aria-current", "page");
        }

        navLinks.forEach((link) => {
          if (link !== activeLink) link.removeAttribute("aria-current");
        });
      });
    },
    {
      rootMargin: "-22% 0px -62% 0px",
      threshold: 0
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;
    if (!email) return;

    try {
      await copyText(email);
      showCopyFeedback("Email copied to clipboard.", true);
    } catch {
      showCopyFeedback("Copy failed. Use the email button instead.", false);
    }
  });
}

reducedMotionQuery.addEventListener?.("change", () => {
  if (reducedMotionQuery.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

setMenu(false);
setupReveal();
setupActiveSection();
updateScrollUI();