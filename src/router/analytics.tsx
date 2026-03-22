import { createRoute } from "@tanstack/react-router";
import { appRootRoute } from "./app-root";
import AnalyticsStatistics from "@/components/AnalyticsAndStatistics/AnalyticsStatistics";

export const analyticsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: "analytics",
  component: AnalyticsStatistics,
});
