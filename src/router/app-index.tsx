import { createRoute, Navigate } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import { homeRoute } from "./home";

export const appIndexRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "/",
  component: () => <Navigate to={homeRoute.to} />,
});
