import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  postalCode: string;
  country: string;
}

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
}

const ClientsContext = createContext<ClientsContextType | null>(null);

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(() => {
    const stored = localStorage.getItem("clients");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const addClient = (client: Client) => {
    setClients((prev) => [...prev, client]);
  };

  const updateClient = (client: Client) => {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ClientsContext.Provider
      value={{ clients, addClient, updateClient, deleteClient }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("useClients must be inside ClientsProvider");
  return ctx;
}
