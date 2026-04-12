const STORAGE_KEY = "brainbox_theme";

export type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function initTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  const theme = stored ?? getSystemTheme();
  applyTheme(theme);
  return theme;
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function getStoredTheme(): Theme | null {
  return localStorage.getItem(STORAGE_KEY) as Theme | null;
}

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
