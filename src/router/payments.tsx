import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import Payments from "@/components/Payments/Payments";

export const paymentsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "payments",
  component: Payments,
});
