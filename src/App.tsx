import type { ReactNode } from "react";

import { ShipmentsProvider } from "./context/ShipmentsContext";
import { ConsigneesProvider } from "./context/ConsigneesContext";
import { ClientsProvider } from "./context/ClientsContext";
import { TicketsProvider } from "./context/TicketContext";

export default function App({ children }: { children: ReactNode }) {
  return (
    <ClientsProvider>
      <ConsigneesProvider>
        <ShipmentsProvider>
          <TicketsProvider>{children}</TicketsProvider>
        </ShipmentsProvider>
      </ConsigneesProvider>
    </ClientsProvider>
  );
}
