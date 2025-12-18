import { createRoute } from "@tanstack/react-router";
import { settingsRootRoute } from "./settings-root";

export const displaySettingsRoute = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "display",
  component: () => <div>Configuraciones de país, currency, idioma.</div>,
});
