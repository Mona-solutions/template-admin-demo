import { createRoute } from "@tanstack/react-router";
import { settingsRootRoute } from "./settings-root";

export const notificationsSettingsRoute = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "notifications",
  component: () => <div>Notificaciones de envíos y alertas.</div>,
});
