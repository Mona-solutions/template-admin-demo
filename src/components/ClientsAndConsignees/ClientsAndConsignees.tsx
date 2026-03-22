import { useState } from "react";
import { ClientsProvider } from "@/context/ClientsContext";
import { ConsigneesProvider } from "@/context/ConsigneesContext";

import ClientDirectory from "./ClientDirectory";
import ConsigneeDirectory from "./ConsigneeDirectory";

export default function ClientsAndConsignees() {
  const [activeTab, setActiveTab] = useState<"clients" | "consignees">(
    "clients"
  );

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients & Consignees</h1>
          <p className="text-gray-200">
            Manage your clients and consignees information.
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "clients"
              ? "bg-[#193455] text-white shadow"
              : "bg-gray-200 text-gray-700 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
          }`}
          onClick={() => setActiveTab("clients")}
        >
          Clients
        </button>

        <button
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "consignees"
              ? "bg-[#193455] text-white shadow"
              : "bg-gray-200 text-gray-700 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
          }`}
          onClick={() => setActiveTab("consignees")}
        >
          Consignees
        </button>
      </div>

      <ClientsProvider>
        <ConsigneesProvider>
          {activeTab === "clients" && <ClientDirectory />}
          {activeTab === "consignees" && <ConsigneeDirectory />}
        </ConsigneesProvider>
      </ClientsProvider>
    </div>
  );
}
