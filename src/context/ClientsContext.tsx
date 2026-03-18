import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { STORAGE_KEYS } from "@/storage/storageKeys";

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
    try {
      const rawV1 = localStorage.getItem(STORAGE_KEYS.clients);
      if (rawV1) {
        const parsed = JSON.parse(rawV1);
        return Array.isArray(parsed) ? (parsed as Client[]) : [];
      }

      const rawOld = localStorage.getItem("clients");
      if (rawOld) {
        const parsedOld = JSON.parse(rawOld);
        return Array.isArray(parsedOld) ? (parsedOld as Client[]) : [];
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients));
    } catch {}
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
