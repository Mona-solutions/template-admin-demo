import { useEffect, useState } from "react";
import {
  createRoute,
  Outlet,
  Navigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

import { rootRoute } from "./root";
import { useAuth } from "@/auth/AuthContext";

import Aside from "@/components/Aside/Aside";
import type { Page } from "@/types/Page";

import { homeRoute } from "./home";
import { myShipmentsRoute } from "./my-shipments";
import { clientsRoute } from "./clients";
import { paymentsRoute } from "./payments";
import { analyticsRoute } from "./analytics";
import { supportRoute } from "./support";
import { settingsRoute } from "./settings/settings-root";

import type { Preferences } from "@/components/Settings/prefs/preferences.types";
import { loadPreferences } from "@/components/Settings/prefs/preferences.storage";

export const appRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "app",
  component: AppGuard,
});

function AppGuard() {
  const { auth } = useAuth();

  // If not authenticated → go back to landing
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <AppLayout />;
}

function AppLayout() {
  const router = useRouter();

  // Make pathname usage explicit to avoid "declared but never read" warnings
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const pathToPage: Record<string, Page> = {
    "/app/home": "Home",
    "/app/my-shipments": "My Shipments",
    "/app/clients": "ClientsAndConsignees",
    "/app/payments": "Payments",
    "/app/analytics": "AnalyticsAndStatistics",
    "/app/support": "Support",
    "/app/settings": "Settings",
  };

  let activePage: Page = "Home";
  if (pathname.startsWith("/app/settings")) {
    activePage = "Settings";
  } else {
    activePage = pathToPage[pathname] ?? "Home";
  }

  const pageToTo: Record<Page, string> = {
    Home: homeRoute.to,
    "My Shipments": myShipmentsRoute.to,
    ClientsAndConsignees: clientsRoute.to,
    Payments: paymentsRoute.to,
    AnalyticsAndStatistics: analyticsRoute.to,
    Support: supportRoute.to,
    Settings: settingsRoute.to,
  };

  const handleNavigate = (page: Page) => {
    router.navigate({ to: pageToTo[page] });
  };

  // Preferences (local) → used to apply theme instantly
  const [prefs, setPrefs] = useState<Preferences>(() => loadPreferences());

  // 1) Apply theme whenever prefs.theme changes
  useEffect(() => {
    const root = document.documentElement;

    const setDark = (on: boolean) => {
      root.classList.toggle("dark", on);
    };

    if (prefs.theme === "dark") setDark(true);
    else if (prefs.theme === "light") setDark(false);
    else {
      // system
      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
      setDark(prefersDark);
    }
  }, [prefs.theme]);

  // 2) Same-tab updates (custom event fired by savePreferences)
  useEffect(() => {
    const onPrefsUpdated = () => setPrefs(loadPreferences());
    window.addEventListener("prefs_updated", onPrefsUpdated);
    return () => window.removeEventListener("prefs_updated", onPrefsUpdated);
  }, []);

  // 3) Cross-tab sync + OS theme changes (when theme === "system")
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "prefs_v1") setPrefs(loadPreferences());
    };

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMediaChange = () => {
      const current = loadPreferences();
      if (current.theme === "system") setPrefs(current);
    };

    window.addEventListener("storage", onStorage);
    media?.addEventListener?.("change", onMediaChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      media?.removeEventListener?.("change", onMediaChange);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Aside activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
