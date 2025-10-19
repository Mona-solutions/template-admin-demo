import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Aside from "./components/Aside/Aside";
import Home from "./components/Home/Home";
import RegisterShipment from "./components/RegisterShippment/RegisterShippment";
import MyShipments from "./components/MyShipments/MyShipments";
import ClientsConsignees from "./components/Clients&Consignees/Clients&Consignees";
import Payments from "./components/Payments/Payments";
import AnalyticsStatistics from "./components/Analytics & Statistics/AnalyticsStatistics";
import Support from "./components/Support/Support";
import LandingPage from "./components/LandingPage/LandingPage";

import type { Shipment } from "./types/Shipment";
import type { User } from "./types/UserData";
import type { Person } from "./types/Person";

type Page =
  | "LandingPage"
  | "Home"
  | "Register Shipment"
  | "My Shipments"
  | "Clients & Consignees"
  | "Payments"
  | "Analytics & Statistics"
  | "Support"
  | "Settings";

export default function App() {
  // Usuario logueado
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Estado global
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const stored = localStorage.getItem("shipments");
    return stored ? JSON.parse(stored) : [];
  });

  const [clients, setClients] = useState<Person[]>(() => {
    const stored = localStorage.getItem("clients");
    return stored ? JSON.parse(stored) : [];
  });

  const [consignees, setConsignees] = useState<Person[]>(() => {
    const stored = localStorage.getItem("consignees");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentPage, setCurrentPage] = useState<Page>("LandingPage");

  // Guardar logueo de usuario en la local storage
  useEffect(() => {
    localStorage.setItem("shipments", JSON.stringify(shipments));
    localStorage.setItem("clients", JSON.stringify(clients));
    localStorage.setItem("consignees", JSON.stringify(consignees));
  }, [shipments, clients, consignees]);

  const addShipment = (newShipment: Shipment) => {
    // Guardar el envío
    setShipments((prev) => [...prev, newShipment]);

    // Crear cliente
    const newClient: Person = {
      id: crypto.randomUUID(),
      name: newShipment.sender,
      address: newShipment.senderAdress,
      postalCode: newShipment.senderPC,
      country: newShipment.senderCountry,
      contactNumber: newShipment.senderContactNumber,
      email: newShipment.senderEmail,
      type: "Client",
    };

    if (!clients.some((c) => c.email === newClient.email)) {
      setClients((prev) => [...prev, newClient]);
    }

    // Crear consignatario
    const newConsignee: Person = {
      id: crypto.randomUUID(),
      name: newShipment.recipient,
      address: newShipment.recipientAdress,
      postalCode: newShipment.recipientPC,
      country: newShipment.recipientCountry,
      contactNumber: newShipment.recipientContactNumber,
      email: newShipment.recipientEmail,
      type: "Consignee",
    };

    if (!consignees.some((c) => c.email === newConsignee.email)) {
      setConsignees((prev) => [...prev, newConsignee]);
    }
  };

  // --- Si no hay usuario ---
  if (!user) {
    return (
      <LandingPage
        onStart={(newUser) => {
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          setCurrentPage("Home");
        }}
      />
    );
  }

  // 🗑️ Eliminar envío por ID
  const deleteShipment = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shipment?"
    );
    if (!confirmDelete) return;

    setShipments((prev) => prev.filter((s) => s.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "LandingPage":
        return <LandingPage onStart={() => setCurrentPage("Home")} />;
      case "Home":
        return <Home user={user} />;
      case "Register Shipment":
        return <RegisterShipment onCreate={addShipment} />;
      case "My Shipments":
        return <MyShipments shipments={shipments} onDelete={deleteShipment} />;
      case "Clients & Consignees":
        return <ClientsConsignees clients={clients} consignees={consignees} />;
      case "Payments":
        return <Payments />;
      case "Analytics & Statistics":
        return <AnalyticsStatistics />;
      case "Support":
        return <Support />;
      case "Settings":
        return <h1 className="text-2xl font-bold">⚙️ Settings Page</h1>;
      default:
        return null;
    }
  };

  return (
    <main className="h-screen flex w-full m-0 p-0">
      {/* Aside solo aparece después del Landing */}
      {currentPage !== "LandingPage" && (
        <Aside activePage={currentPage} onNavigate={setCurrentPage} />
      )}

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
