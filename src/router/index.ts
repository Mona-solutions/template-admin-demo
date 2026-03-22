import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";

import { landingRoute } from "./landing";
import { appRootRoute } from "./app-root";

import { appIndexRoute } from "./app-index";
import { homeRoute } from "./home";
import { myShipmentsRoute } from "./my-shipments";
import { clientsRoute } from "./clients";
import { paymentsRoute } from "./payments";
import { analyticsRoute } from "./analytics";
import { supportRoute } from "./support";
import { settingsRoute } from "./settings/settings-root";

appRootRoute.addChildren([
  appIndexRoute,
  homeRoute,
  myShipmentsRoute,
  clientsRoute,
  paymentsRoute,
  analyticsRoute,
  supportRoute,
  settingsRoute,
]);

export const routeTree = rootRoute.addChildren([landingRoute, appRootRoute]);

export const router = createRouter({ routeTree });
// import { appRootRoute } from "./app-root";
// import { homeRoute } from "./home";
// import { myShipmentsRoute } from "./my-shipments";
// import { clientsRoute } from "./clients";
// import { paymentsRoute } from "./payments";
// import { analyticsRoute } from "./analytics";
// import { supportRoute } from "./support";

// import {
//   settingsRootRoute,
//   settingsIndexRoute,
// } from "./settings/settings-root";

// import { accountSettingsRoute } from "./settings/account.tsx";
// import { displaySettingsRoute } from "./settings/display.tsx";
// import { notificationsSettingsRoute } from "./settings/notifications.tsx";

// appRootRoute.addChildren([
//   homeRoute,
//   myShipmentsRoute,
//   clientsRoute,
//   paymentsRoute,
//   analyticsRoute,
//   supportRoute,
//   settingsRootRoute,
// ]);

// settingsRootRoute.addChildren([
//   settingsIndexRoute,
//   displaySettingsRoute,
//   notificationsSettingsRoute,
//   accountSettingsRoute,
// ]);

// export const routeTree = rootRoute.addChildren([landingRoute, appRootRoute]);

// export const router = createRouter({ routeTree });

// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }
