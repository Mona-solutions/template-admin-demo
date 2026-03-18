import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { STORAGE_KEYS } from "@/storage/storageKeys";

export interface Consignee {
  id: string;
  name: string;
  email: string;
  address: string;
  postalCode: string;
  country: string;
}

interface ConsigneesContextType {
  consignees: Consignee[];
  addConsignee: (c: Consignee) => void;
  updateConsignee: (c: Consignee) => void;
  deleteConsignee: (id: string) => void;
}

const ConsigneesContext = createContext<ConsigneesContextType | null>(null);

export function ConsigneesProvider({ children }: { children: ReactNode }) {
  const [consignees, setConsignees] = useState<Consignee[]>(() => {
    try {
      const rawV1 = localStorage.getItem(STORAGE_KEYS.consignees);
      if (rawV1) {
        const parsed = JSON.parse(rawV1);
        return Array.isArray(parsed) ? (parsed as Consignee[]) : [];
      }

      const rawOld = localStorage.getItem("consignees");
      if (rawOld) {
        const parsedOld = JSON.parse(rawOld);
        return Array.isArray(parsedOld) ? (parsedOld as Consignee[]) : [];
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.consignees, JSON.stringify(consignees));
    } catch {}
  }, [consignees]);

  const addConsignee = (c: Consignee) => {
    setConsignees((prev) => [...prev, c]);
  };

  const updateConsignee = (c: Consignee) => {
    setConsignees((prev) => prev.map((x) => (x.id === c.id ? c : x)));
  };

  const deleteConsignee = (id: string) => {
    setConsignees((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ConsigneesContext.Provider
      value={{ consignees, addConsignee, updateConsignee, deleteConsignee }}
    >
      {children}
    </ConsigneesContext.Provider>
  );
}

export function useConsignees() {
  const ctx = useContext(ConsigneesContext);
  if (!ctx)
    throw new Error("useConsignees must be used inside ConsigneesProvider");
  return ctx;
}
