import { homeRoute } from "./home";
import { myShipmentsRoute } from "./my-shipments";
import { clientsRoute } from "./clients";
import { paymentsRoute } from "./payments";
import { analyticsRoute } from "./analytics";
import { supportRoute } from "./support";
import { settingsRoute } from "./settings/settings-root";

import {
  createRoute,
  Outlet,
  Navigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { rootRoute } from "./root";
import { useUser } from "@/context/UserContext";
import Aside from "@/components/Aside/Aside";
import type { Page } from "@/types/Page";

export const appRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "app",
  component: AppGuard,
});

function AppGuard() {
  const { user } = useUser();

  // Si no hay usuario → volver a la landing
  if (!user) {
    return <Navigate to="/" />;
  }

  // Usuario válido → renderizar el layout real
  return <AppLayout />;
}

function AppLayout() {
  const router = useRouter();
  const { location } = useRouterState();

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

  if (location.pathname.startsWith("/app/settings")) {
    activePage = "Settings";
  } else {
    activePage = pathToPage[location.pathname] ?? "Home";
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

  return (
    <div className="flex h-screen">
      <Aside activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
