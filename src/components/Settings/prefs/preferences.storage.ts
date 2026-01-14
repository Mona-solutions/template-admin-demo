import type { Preferences } from "./preferences.types";

export const PREFS_KEY = "prefs_v1";

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { language: "en", theme: "system" };
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return {
      language: parsed.language === "es" ? "es" : "en",
      theme: parsed.theme === "light" || parsed.theme === "dark" || parsed.theme === "system"
        ? parsed.theme
        : "system",
    };
  } catch {
    return { language: "en", theme: "system" };
  }
}

export function savePreferences(prefs: Preferences) {
   try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new Event("prefs_updated")); // ✅ important
  } catch {
    // ignore
  }
}
