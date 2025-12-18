import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./../app-root";
import Settings from "@/components/Settings/Settings";

export const settingsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "settings",
  component: Settings,
});
