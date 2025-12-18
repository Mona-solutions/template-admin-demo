import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import LandingPage from "@/components/LandingPage/LandingPage";

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
