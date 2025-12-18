import { createContext, useContext, useState, useEffect } from "react";
import type { Shipment } from "../types/Shipment";
import type { ShipmentCreateData } from "../types/ShipmentCreateData";

interface ShipmentsContextType {
  shipments: Shipment[];
  create: (data: ShipmentCreateData) => void;
  update: (shipment: Shipment) => void;
  remove: (id: string) => void;
}

const ShipmentsContext = createContext<ShipmentsContextType | null>(null);

export function ShipmentsProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>(() =>
    JSON.parse(localStorage.getItem("shipments") || "[]")
  );

  // localStorage sync
  useEffect(() => {
    localStorage.setItem("shipments", JSON.stringify(shipments));
  }, [shipments]);

  function create(data: ShipmentCreateData) {
    const newShipment: Shipment = {
      id: crypto.randomUUID(),

      weigth: "",
      dimensions: "",
      declaredValue: "",
      instructions: "",

      senderAdress: "",
      senderPC: "",
      senderCountry: "",
      senderContactNumber: "",

      recipientAdress: "",
      recipientPC: "",
      recipientCountry: "",
      recipientContactNumber: "",

      ...data,
    };

    setShipments((prev) => [...prev, newShipment]);
  }

  function update(updated: Shipment) {
    setShipments((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  }

  function remove(id: string) {
    setShipments((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <ShipmentsContext.Provider value={{ shipments, create, update, remove }}>
      {children}
    </ShipmentsContext.Provider>
  );
}

export function useShipments() {
  const ctx = useContext(ShipmentsContext);
  if (!ctx) throw new Error("useShipments must be inside ShipmentsProvider");
  return ctx;
}
