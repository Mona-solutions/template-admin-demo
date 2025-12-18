import { createContext, useContext, useEffect, useState } from "react";
import type { TicketStatus } from "@/components/Support/StatusBadge";

// TICKET TYPE CENTRALIZADO
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

const STORAGE_KEY = "supportTickets";
const TicketsContext = createContext<TicketsContextType | null>(null);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // CARGAR STORAGE
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTickets(parsed);
        }
      } catch (e) {
        console.error("Error cargando tickets:", e);
      }
    }
  }, []);

  // GUARDAR STORAGE
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
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
    <TicketsContext.Provider
      value={{ tickets, addTicket, updateTicket, deleteTicket }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used inside TicketsProvider");
  return ctx;
}
