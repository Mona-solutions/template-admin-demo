import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthState, AuthUser } from "./auth.types";
import { clearAuthState, loadAuthState, saveAuthState, AUTH_STORAGE_KEY } from "./auth.storage";

type AuthContextValue = {
  auth: AuthState;
  login: (user: AuthUser) => void;
  logout: () => void;
  resetAuth: () => void; 
  updateUser: (patch: Partial<AuthUser>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => loadAuthState());

  useEffect(() => {
    saveAuthState(auth);
  }, [auth]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) setAuth(loadAuthState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logoutImpl = () => {
    clearAuthState();
    setAuth({ isAuthenticated: false, user: null });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      login: (user) => setAuth({ isAuthenticated: true, user }),
      logout: logoutImpl,
      resetAuth: logoutImpl, 
      updateUser: (patch) =>
        setAuth((prev) => {
          if (!prev.isAuthenticated || !prev.user) return prev;
          return { isAuthenticated: true, user: { ...prev.user, ...patch } };
        }),
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
