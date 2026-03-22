import { useState } from "react";
import type { Shipment } from "../../types/Shipment";
import { SHIPMENT_STATUSES, type ShipmentStatus } from "../../types/Shipment";
import { useShipments } from "../../context/ShipmentsContext";

import ShipmentsTable from "../MyShipments/ShipmentsTable";
import Pagination from "../MyShipments/Pagination";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";

import ShipmentDialog from "./ShipmentDialog";

export default function ShipmentsManager() {
  const { shipments, update, remove } = useShipments();

  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>("All");

  const [selectedSort, setSelectedSort] = useState<
    "Sort by Date" | "Newest First" | "Oldest First"
  >("Sort by Date");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.recipient.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || s.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const sortedShipments =
    selectedSort === "Newest First"
      ? [...filteredShipments].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      : selectedSort === "Oldest First"
      ? [...filteredShipments].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      : filteredShipments;

  return (
    <div className="space-y-10">
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md flex justify-between items-center dark:bg-white text-[rgb(25,52,85)] dark:text-[rgb(25,52,85)]">
        <div>
          <h1 className="text-2xl font-bold">Create & Manage Shipments</h1>
          <p className="text-gray-200 dark:text-black">
            Register and track all your shipments easily.
          </p>
        </div>

        <ShipmentDialog />
      </div>

      <ShipmentsList
        shipments={sortedShipments}
        onEdit={update}
        onDelete={remove}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
}

function ShipmentsList({
  shipments,
  onDelete,
  onEdit,
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedSort,
  setSelectedSort,
}: {
  shipments: Shipment[];
  onDelete: (id: string) => void;
  onEdit: (shipment: Shipment) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedStatus: ShipmentStatus;
  setSelectedStatus: (val: ShipmentStatus) => void;
  selectedSort: "Sort by Date" | "Newest First" | "Oldest First";
  setSelectedSort: (
    val: "Sort by Date" | "Newest First" | "Oldest First"
  ) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[rgb(25,52,85)] dark:text-[#E6EDF5]">
        Shipments List
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by Order # / Tracking ID / Sender / Recipient"
          className="w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Dropdown
          label="Status"
          options={SHIPMENT_STATUSES}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />

        <Dropdown
          label="Sort"
          options={["Sort by Date", "Newest First", "Oldest First"]}
          value={selectedSort}
          onChange={setSelectedSort}
        />
      </div>

      <ShipmentsTable
        shipments={shipments}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination />
    </div>
  );
}

function Dropdown({
  label,
  options,
  value,
  onChange,
  width = "w-48",
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (val: any) => void;
  width?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={[
            "flex justify-between items-center",
            width,
            "bg-background text-foreground border-border",
            "hover:bg-muted/60 dark:hover:bg-muted/30",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          ].join(" ")}
        >
          <span className="truncate">
            {label}: {value}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className={[
          width,
          "bg-popover text-popover-foreground border-border",
          "shadow-md",
        ].join(" ")}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {label}
        </DropdownMenuLabel>

        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className={[
              "cursor-pointer",
              "focus:bg-muted focus:text-foreground",
              "hover:bg-muted/70 dark:hover:bg-muted/40",
              "rounded-sm",
            ].join(" ")}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

