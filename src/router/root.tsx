import { createRootRoute, Outlet } from "@tanstack/react-router";
import App from "@/App";
import { AuthProvider } from "@/auth/AuthContext";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AuthProvider>
      <App>
        <Outlet />
      </App>
    </AuthProvider>
  );
}
