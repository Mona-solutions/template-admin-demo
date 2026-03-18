import type { ReactNode } from "react";

import { ShipmentsProvider } from "./context/ShipmentsContext";
import { ConsigneesProvider } from "./context/ConsigneesContext";
import { ClientsProvider } from "./context/ClientsContext";
import { TicketsProvider } from "./context/TicketContext";
import { PaymentsProvider } from "./context/PaymentsContext";

export default function App({ children }: { children: ReactNode }) {
  return (
    <ClientsProvider>
      <ConsigneesProvider>
        <ShipmentsProvider>
          <TicketsProvider>
            <PaymentsProvider>{children}</PaymentsProvider>
          </TicketsProvider>
        </ShipmentsProvider>
      </ConsigneesProvider>
    </ClientsProvider>
  );
}
