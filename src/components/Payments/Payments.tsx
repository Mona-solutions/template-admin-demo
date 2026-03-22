import { useMemo, useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";

import PaymentsData from "./PaymentsData";
import FilterPaymentsData from "./FilterPaymentsData";
import PaymentDialog from "./PaymentDialog";
import PaymentDetailsDialog from "./PaymentsDetailDialog";
import { Button } from "../ui/button";

import {
  type Payment,
  type PaymentStatus,
  type PaymentMethod,
} from "./../../types/Payments";

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

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("payments") || "[]");
    setPayments(stored);
  }, []);

  const handleAddPayment = (payment: Payment) => {
    const updated = [...payments, payment];
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>(
    "All"
  );
  const [methodFilter, setMethodFilter] = useState<"All" | PaymentMethod>(
    "All"
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filtered = useMemo(() => {
    const start = dateRange?.from
      ? new Date(new Date(dateRange.from).setHours(0, 0, 0))
      : null;

    const end = dateRange?.to
      ? new Date(new Date(dateRange.to).setHours(23, 59, 59))
      : null;

    return payments.filter((p) => {
      const matchesSearch =
        !search ||
        p.invoice.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || p.status === statusFilter;

      const matchesMethod = methodFilter === "All" || p.method === methodFilter;

      const issued = new Date(p.issuedAt);

      const afterStart = !start || issued >= start;
      const beforeEnd = !end || issued <= end;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        afterStart &&
        beforeEnd
      );
    });
  }, [payments, search, statusFilter, methodFilter, dateRange]);

  const totalAmount = filtered.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = filtered.filter((p) => p.status === "Paid").length;
  const pendingCount = filtered.filter((p) => p.status === "Pending").length;
  const failedCount = filtered.filter((p) => p.status === "Failed").length;

  const [dialogOpen, setDialogOpen] = useState(false);

  function currency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  const handleDeletePayment = (invoice: string) => {
    const updated = payments.filter((p) => p.invoice !== invoice);
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };

  const handleUpdatePayment = (updated: Payment) => {
    const newList = payments.map((p) =>
      p.invoice === updated.invoice ? updated : p
    );
    setPayments(newList);
    localStorage.setItem("payments", JSON.stringify(newList));
  };

  return (
    <div className="space-y-6">
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create & Manage Payments</h1>
          <p className="text-gray-200">
            Register and track all your payments easily.
          </p>
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 bg-white text-[rgb(25,52,85)] px-4 py-2 rounded-md font-medium shadow-sm hover:bg-gray-100 transition dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
        >
          <span className="text-lg font-bold">+</span>
          New Payment
        </button>

        <PaymentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleAddPayment}
        />
      </div>

      <PaymentsData
        totalAmount={totalAmount}
        paidCount={paidCount}
        pendingCount={pendingCount}
        failedCount={failedCount}
        currency={currency}
      />

      <FilterPaymentsData
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-foreground">
          <tr className="border-b border-border">
            <th className="p-3 font-semibold">Invoice #</th>
            <th className="p-3 font-semibold">Client</th>
            <th className="p-3 font-semibold">Amount</th>
            <th className="p-3 font-semibold">Method</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Issued</th>
            <th className="p-3 font-semibold">Due</th>
            <th className="p-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>

    <tbody className="divide-y divide-border">
      {filtered.map((p) => (
        <PaymentDetailsDialog
          key={p.invoice}
          payment={p}
          onUpdate={handleUpdatePayment}
          onDelete={handleDeletePayment}
        >
          <tr className="cursor-pointer transition-colors hover:bg-muted/40">
            <td className="p-3 font-medium">{p.invoice}</td>
            <td className="p-3">{p.client}</td>
            <td className="p-3">{currency(p.amount)}</td>
            <td className="p-3">{p.method}</td>
            <td className="p-3">
              <StatusBadge status={p.status} />
            </td>
            <td className="p-3">{p.issuedAt}</td>
            <td className="p-3">{p.dueAt}</td>

            <td className="p-3 text-right">
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePayment(p.invoice);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        </PaymentDetailsDialog>
      ))}

      {filtered.length === 0 && (
        <tr>
          <td className="p-10 text-center text-muted-foreground" colSpan={8}>
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
