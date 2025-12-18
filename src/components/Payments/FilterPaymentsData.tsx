import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import type { PaymentMethod, PaymentStatus } from "./Payments";

interface FilterPaymentsDataProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "All" | PaymentStatus;
  setStatusFilter: (val: "All" | PaymentStatus) => void;
  methodFilter: "All" | PaymentMethod;
  setMethodFilter: (val: "All" | PaymentMethod) => void;
  dateRange: DateRange | undefined;
  setDateRange: (val: DateRange | undefined) => void;
}

// Dropdown genérico adaptado a shadcn
interface ShadcnDropdownProps<T extends string> {
  label?: string;
  options: readonly T[];
  value: T | "All";
  onChange: (value: T | "All") => void;
  width?: string;
}

function ShadcnDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  width = "w-48",
}: ShadcnDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex justify-between items-center ${width} bg-white text-gray-700 border`}
        >
          {label && <span className="font-medium mr-1">{label}:</span>}
          <span>{value}</span>
          <svg
            className="w-4 h-4 ml-auto text-gray-500"
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`bg-white border shadow-lg ${width}`}>
        <DropdownMenuLabel className="text-sm text-gray-500">
          {label || "Select"}
        </DropdownMenuLabel>
        {(["All", ...options] as const).map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="cursor-pointer hover:bg-[rgb(25,52,85)] hover:text-white"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function FilterPaymentsData({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  dateRange,
  setDateRange,
}: FilterPaymentsDataProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      {/* SEARCH */}
      <Input
        placeholder="Search by Invoice / Client"
        className="w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* DROPDOWNS */}
      <ShadcnDropdown
        label="Status"
        options={["Paid", "Pending", "Failed", "Refunded"]}
        value={statusFilter}
        onChange={(val) => setStatusFilter(val as "All" | PaymentStatus)}
      />

      <ShadcnDropdown
        label="Method"
        options={["Credit Card", "Bank Transfer", "PayPal", "Cash"]}
        value={methodFilter}
        onChange={(val) => setMethodFilter(val as "All" | PaymentMethod)}
      />

      {/* DATE RANGE PICKER */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white text-gray-700 border"
          >
            <CalendarIcon className="w-4 h-4 text-gray-600" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "MMM d, yyyy")} -{" "}
                  {format(dateRange.to, "MMM d, yyyy")}
                </>
              ) : (
                format(dateRange.from, "MMM d, yyyy")
              )
            ) : (
              "Select Date Range"
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
