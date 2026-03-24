import { useState } from "react";
import ClientDirectory from "./ClientDirectory";
import ConsigneeDirectory from "./ConsigneeDirectory";

export default function ClientsAndConsignees() {
  const [activeTab, setActiveTab] = useState<"clients" | "consignees">(
    "clients"
  );

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md flex items-center justify-between dark:bg-[#DEE6F0] dark:text-[rgb(25,52,85)] ">
        <div>
          <h1 className="text-2xl font-bold">Clients & Consignees</h1>
          <p className="text-gray-200 dark:text-gray-800">
            Manage your clients and consignees information.
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "clients"
              ? "bg-[#193455] text-white shadow"
              : "bg-gray-200 hover:bg-slate-300 text-gray-700 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-300"
          }`}
          onClick={() => setActiveTab("clients")}
        >
          Clients
        </button>

        <button
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeTab === "consignees"
              ? "bg-[#193455] text-white shadow"
              : "bg-gray-200 hover:bg-slate-300 text-gray-700 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-300"
          }`}
          onClick={() => setActiveTab("consignees")}
        >
          Consignees
        </button>
      </div>

      {activeTab === "clients" && <ClientDirectory />}
      {activeTab === "consignees" && <ConsigneeDirectory />}
    </div>
  );
}
