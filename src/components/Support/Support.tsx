import { useState } from "react";
import SupportActions from "./SupportActions";
import type { Ticket } from "./TicketsTable";
import TicketsTable from "./TicketsTable";

const BRAND = "rgb(25,52,85)";

export default function Support() {
  const categoryHeader = `bg-[${BRAND}] text-white p-6 rounded-lg shadow-md mb-6`;

  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      subject: "Issue with shipment #1420",
      status: "Open",
      createdAt: "2025-09-28",
    },
    {
      id: 2,
      subject: "Billing clarification",
      status: "In Progress",
      createdAt: "2025-09-26",
    },
    {
      id: 3,
      subject: "Shipment delayed",
      status: "Resolved",
      createdAt: "2025-09-22",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={categoryHeader}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-1.414 1.414A9 9 0 116.05 6.05l1.414-1.414A11 11 0 1018.364 5.636z"
            />
          </svg>
          Support
        </h1>
        <p className="text-gray-200">
          Get help with your shipments, track tickets, or contact our support
          team.
        </p>
      </div>

      {/* Quick Actions */}
      <SupportActions />

      {/* Tickets Table */}
      <TicketsTable tickets={tickets} />
    </div>
  );
}
