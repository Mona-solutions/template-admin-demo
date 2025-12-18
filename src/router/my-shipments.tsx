import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import ShipmentsManager from "@/components/MyShipments/ShipmentManager";

export const myShipmentsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "my-shipments",
  component: ShipmentsManager,
});
