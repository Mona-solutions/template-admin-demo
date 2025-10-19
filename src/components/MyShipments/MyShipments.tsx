import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ShipmentsTable from "./ShipmentsTable";
import Pagination from "./Pagination";
import {
  SHIPMENT_STATUSES,
  type Shipment,
  type ShipmentStatus,
} from "../../types/Shipment";
import { fetchShipments } from "../../api/shipments";

interface MyShipmentsProps {
  shipments: Shipment[];
  onDelete: (id: string) => void;
}

interface CustomDropdownProps<T extends string> {
  label?: string;
  options: readonly T[];
  value: T | "All";
  onChange: (value: T | "All") => void;
  width?: string;
}

function CustomDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  width = "w-48",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`p-3 border rounded bg-white ${width} flex justify-between items-center`}
      >
        <div className="flex gap-1 items-center">
          {label && <span className="font-medium">{label}:</span>}
          <span>{value}</span>
        </div>
        <svg
          className="w-4 h-4 ml-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute mt-1 ${width} bg-white border rounded shadow-lg z-10`}
        >
          {(["All", ...options] as const).map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[rgb(25,52,85)] hover:text-white cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---- Main MyShipments component ----
export default function MyShipments({ onDelete }: MyShipmentsProps) {
  const categoryHeader =
    "bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md mb-6";

  // State for filters
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus | "All">(
    "All"
  );
  const [selectedSort, setSelectedSort] = useState("Sort by Date");

  const {
    data: fetchedShipments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shipments"],
    queryFn: fetchShipments,
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Loading shipments...</p>;

  if (isError)
    return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
              d="M3 3h18v13H3V3zm0 13h18v5H3v-5z"
            />
          </svg>
          My Shipments
        </h1>
        <p className="text-gray-200">Track and manage all your shipments.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order # / Tracking ID"
          className="p-3 border rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[rgb(25,52,85)]"
        />
        <CustomDropdown
          label="Status"
          options={SHIPMENT_STATUSES}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />
        <CustomDropdown
          label="Sort"
          options={["Sort by Date", "Newest First", "Oldest First"] as const}
          value={selectedSort}
          onChange={setSelectedSort}
        />{" "}
      </div>

      <ShipmentsTable shipments={fetchedShipments || []} onDelete={onDelete} />
      <Pagination />
    </div>
  );
}
