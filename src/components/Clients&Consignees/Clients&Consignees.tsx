import { useState } from "react";
import ClientDirectory from "./ClientDirectory";
import ConsigneeDirectory from "./ConsigneeDirectory";
import type { Person } from "../../types/Person";

interface ClientsConsigneesProps {
  clients: Person[];
  consignees: Person[];
}

export default function ClientsConsignees({
  clients,
  consignees,
}: ClientsConsigneesProps) {
  const [activeTab, setActiveTab] = useState<"clients" | "consignees">(
    "clients"
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">Clients & Consignees</h1>
        <p className="text-gray-200">Manage your senders and recipients.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("clients")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "clients"
              ? "border-b-2 border-[rgb(25,52,85)] text-[rgb(25,52,85)]"
              : "text-gray-500"
          }`}
        >
          Client Directory
        </button>
        <button
          onClick={() => setActiveTab("consignees")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "consignees"
              ? "border-b-2 border-[rgb(25,52,85)] text-[rgb(25,52,85)]"
              : "text-gray-500"
          }`}
        >
          Consignee Directory
        </button>
      </div>

      {/* Active Tab */}
      {activeTab === "clients" && <ClientDirectory clients={clients} />}
      {activeTab === "consignees" && (
        <ConsigneeDirectory consignees={consignees} />
      )}
    </div>
  );
}
