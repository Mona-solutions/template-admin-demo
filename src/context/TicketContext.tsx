import { createContext, useContext, useEffect, useState } from "react";
import type { TicketStatus } from "@/components/Support/StatusBadge";
import { STORAGE_KEYS } from "@/storage/storageKeys";

export interface Ticket {
  id: number;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  category: string;
  priority: string;
  description: string;
}

interface TicketsContextType {
  tickets: Ticket[];
  addTicket: (t: Ticket) => void;
  updateTicket: (t: Ticket) => void;
  deleteTicket: (id: number) => void;
}

const TicketsContext = createContext<TicketsContextType | null>(null);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.tickets);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? (parsed as Ticket[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  function addTicket(t: Ticket) {
    setTickets((prev) => [...prev, t]);
  }

  function updateTicket(t: Ticket) {
    setTickets((prev) => prev.map((x) => (x.id === t.id ? t : x)));
  }

  function deleteTicket(id: number) {
    setTickets((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket }}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used inside TicketsProvider");
  return ctx;
}
