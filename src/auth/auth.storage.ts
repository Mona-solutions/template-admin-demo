import type { AuthState } from "./auth.types";

export const AUTH_STORAGE_KEY = "auth_v1";

export function loadAuthState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { isAuthenticated: false, user: null };

    const parsed = JSON.parse(raw) as any;

    const hasIdentity =
      typeof parsed?.user?.username === "string" &&
      parsed.user.username.trim().length > 0
        ? true
        : typeof parsed?.user?.name === "string" &&
          parsed.user.name.trim().length > 0;

    if (parsed?.isAuthenticated === true && parsed?.user && hasIdentity) {
      return {
        isAuthenticated: true,
        user: {
          username: String(parsed.user.username ?? ""),
          email: String(parsed.user.email ?? ""),
          name:
            typeof parsed.user.name === "string" ? parsed.user.name : undefined,
          avatar:
            typeof parsed.user.avatar === "string"
              ? parsed.user.avatar
              : undefined,
        },
      };
    }

    return { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export function clearAuthState() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function saveAuthState(state: AuthState) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
