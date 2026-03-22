import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

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
    const stored = localStorage.getItem("consignees");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("consignees", JSON.stringify(consignees));
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
