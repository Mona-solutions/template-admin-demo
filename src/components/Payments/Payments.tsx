import { useMemo, useState } from "react";
import PaymentsData from "./PaymentsData";
import FilterPaymentsData from "./FilterPaymentsData";

// ---------------- Types ----------------
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type PaymentMethod = "Credit Card" | "Bank Transfer" | "Cash" | "PayPal";

export interface Payment {
  invoice: string;
  client: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  issuedAt: string;
  dueAt: string;
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status]}`}>
      {status}
    </span>
  );
}

// ---------------- Payments ----------------
export default function Payments() {
  const BRAND = "rgb(25,52,85)";

  const data: Payment[] = [
    {
      invoice: "INV-1042",
      client: "Acme Inc.",
      amount: 320.5,
      method: "Credit Card",
      status: "Paid",
      issuedAt: "2025-09-15",
      dueAt: "2025-09-20",
    },
    {
      invoice: "INV-1043",
      client: "Global Corp",
      amount: 980,
      method: "Bank Transfer",
      status: "Pending",
      issuedAt: "2025-09-18",
      dueAt: "2025-09-28",
    },
    {
      invoice: "INV-1044",
      client: "Apex Ltd.",
      amount: 210.75,
      method: "PayPal",
      status: "Failed",
      issuedAt: "2025-09-10",
      dueAt: "2025-09-17",
    },
    {
      invoice: "INV-1045",
      client: "Delta Logistics",
      amount: 450.0,
      method: "Cash",
      status: "Refunded",
      issuedAt: "2025-09-05",
      dueAt: "2025-09-12",
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>(
    "All"
  );
  const [methodFilter, setMethodFilter] = useState<"All" | PaymentMethod>(
    "All"
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch =
        !search ||
        p.invoice.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesMethod = methodFilter === "All" || p.method === methodFilter;

      const issueDate = new Date(p.issuedAt).getTime();
      const fromOk = !dateFrom || issueDate >= new Date(dateFrom).getTime();
      const toOk = !dateTo || issueDate <= new Date(dateTo).getTime();

      return matchesSearch && matchesStatus && matchesMethod && fromOk && toOk;
    });
  }, [data, search, statusFilter, methodFilter, dateFrom, dateTo]);

  const totalAmount = filtered.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = filtered.filter((p) => p.status === "Paid").length;
  const pendingCount = filtered.filter((p) => p.status === "Pending").length;
  const failedCount = filtered.filter((p) => p.status === "Failed").length;

  function currency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={`bg-[${BRAND}] text-white p-6 rounded-lg shadow-md mb-6`}>
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
              d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M7 13h5"
            />
          </svg>
          Payments
        </h1>
        <p className="text-gray-200">
          Manage invoices, payment status, and methods.
        </p>
      </div>

      {/* Payment Data Cards */}
      <PaymentsData
        totalAmount={totalAmount}
        paidCount={paidCount}
        pendingCount={pendingCount}
        failedCount={failedCount}
        currency={currency}
      />

      {/* Filters */}
      <FilterPaymentsData
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Client</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Issued</th>
              <th className="p-3">Due</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.invoice} className="border-t">
                <td className="p-3 font-medium">{p.invoice}</td>
                <td className="p-3">{p.client}</td>
                <td className="p-3">{currency(p.amount)}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="p-3">{p.issuedAt}</td>
                <td className="p-3">{p.dueAt}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-[rgb(25,52,85)] hover:underline">
                    View
                  </button>
                  <button className="text-[rgb(25,52,85)] hover:underline">
                    Download
                  </button>
                  <button className="text-red-600 hover:underline">
                    Refund
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={8}>
                  No payments match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
