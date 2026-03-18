import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Payment } from "@/types/Payments";
import { STORAGE_KEYS } from "@/storage/storageKeys";

interface PaymentsContextType {
  payments: Payment[];
  addPayment: (p: Payment) => void;
  updatePayment: (p: Payment) => void;
  deletePayment: (invoice: string) => void;
}

const PaymentsContext = createContext<PaymentsContextType | null>(null);

export function PaymentsProvider({ children }: { children: ReactNode }) {
  const [payments, setPayments] = useState<Payment[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.payments);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Payment[]) : [];
      }

      const rawOld = localStorage.getItem("payments");
      if (rawOld) {
        const parsed = JSON.parse(rawOld);
        return Array.isArray(parsed) ? (parsed as Payment[]) : [];
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.payments, JSON.stringify(payments));
    } catch {}
  }, [payments]);

  function addPayment(p: Payment) {
    setPayments((prev) => [...prev, p]);
  }

  function updatePayment(p: Payment) {
    setPayments((prev) => prev.map((x) => (x.invoice === p.invoice ? p : x)));
  }

  function deletePayment(invoice: string) {
    setPayments((prev) => prev.filter((x) => x.invoice !== invoice));
  }

  return (
    <PaymentsContext.Provider value={{ payments, addPayment, updatePayment, deletePayment }}>
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error("usePayments must be inside PaymentsProvider");
  return ctx;
}
