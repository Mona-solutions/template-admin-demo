import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import ClientsAndConsignees from "@/components/ClientsAndConsignees/ClientsAndConsignees";

export const clientsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "clients",
  component: ClientsAndConsignees,
});
