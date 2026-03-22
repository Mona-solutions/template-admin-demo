import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import Home from "@/components/Home/Home";

export const homeRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "/home",
  component: Home,
});
