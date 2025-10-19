import CustomDropdown from "../CustomDropDown";
import type { PaymentStatus, PaymentMethod } from "./Payments";

interface FilterPaymentsDataProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "All" | PaymentStatus;
  setStatusFilter: (val: "All" | PaymentStatus) => void;
  methodFilter: "All" | PaymentMethod;
  setMethodFilter: (val: "All" | PaymentMethod) => void;
  dateFrom: string;
  setDateFrom: (val: string) => void;
  dateTo: string;
  setDateTo: (val: string) => void;
}

export default function FilterPaymentsData({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}: FilterPaymentsDataProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <input
        type="text"
        placeholder="Search by Invoice / Client"
        className="p-3 border rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[rgb(25,52,85)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CustomDropdown
        label="Status"
        options={["All", "Paid", "Pending", "Failed", "Refunded"]}
        value={statusFilter}
        onChange={(val) => setStatusFilter(val as "All" | PaymentStatus)}
      />

      <CustomDropdown
        label="Method"
        options={["All", "Credit Card", "Bank Transfer", "PayPal", "Cash"]}
        value={methodFilter}
        onChange={(val) => setMethodFilter(val as "All" | PaymentMethod)}
      />

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">From</label>
        <input
          type="date"
          className="p-2 border rounded bg-white"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">To</label>
        <input
          type="date"
          className="p-2 border rounded bg-white"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
    </div>
  );
}
