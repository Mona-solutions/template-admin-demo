import type { ReactNode } from "react";

import { ShipmentsProvider } from "./context/ShipmentsContext";
import { ConsigneesProvider } from "./context/ConsigneesContext";
import { ClientsProvider } from "./context/ClientsContext";
import { TicketsProvider } from "./context/TicketContext";
import { UserProvider } from "./context/UserContext";

export default function App({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ClientsProvider>
        <ConsigneesProvider>
          <ShipmentsProvider>
            <TicketsProvider>{children}</TicketsProvider>
          </ShipmentsProvider>
        </ConsigneesProvider>
      </ClientsProvider>
    </UserProvider>
  );
}
