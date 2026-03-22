import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import Support from "@/components/Support/Support";

export const supportRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "support",
  component: Support,
});
