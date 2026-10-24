
const themeSelect = document.getElementById("theme-select");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(preference) {
  const selectedTheme =
    preference === "system"
      ? (systemTheme.matches ? "dark" : "light")
      : preference;

  document.documentElement.dataset.theme = selectedTheme;
}

let savedTheme = localStorage.getItem("portfolio-theme") || "system";

if (!["system", "light", "dark"].includes(savedTheme)) {
  savedTheme = "system";
}

themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", () => {
  const preference = themeSelect.value;

  localStorage.setItem("portfolio-theme", preference);
  applyTheme(preference);
});

systemTheme.addEventListener("change", () => {
  if (themeSelect.value === "system") {
    applyTheme("system");
  }
});

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Keyboard support for mobile navigation
function closeMobileNavigation() {
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMobileNavigation();
    menuToggle.focus();
  }
});
