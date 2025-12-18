import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Payment } from "./Payments";

export default function PaymentDetailsDialog({
  payment,
  onUpdate,
  children,
}: {
  payment: Payment;
  onUpdate: (updated: Payment) => void;
  onDelete: (invoice: string) => void;
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...payment });

  const change = (key: keyof Payment, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      onUpdate(form);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[rgb(25,52,85)]">
            {isEditing ? "Edit Payment" : "Payment Details"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {isEditing
              ? "Modify the payment information and save your changes."
              : "View complete payment information here."}
          </DialogDescription>
        </DialogHeader>

        {/* ========================== MODO EDICIÓN ========================== */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Client</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={form.client}
                  onChange={(e) => change("client", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={form.amount}
                  onChange={(e) => change("amount", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Method</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={form.method}
                  onChange={(e) => change("method", e.target.value)}
                >
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>PayPal</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={form.status}
                  onChange={(e) => change("status", e.target.value)}
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                  <option>Refunded</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        )}

        {/* ========================== MODO VISUALIZACIÓN ========================== */}
        {!isEditing && (
          <div className="space-y-6">
            {/* SECTION: GENERAL */}
            <section className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-[rgb(25,52,85)] mb-4">
                General
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Invoice #:</strong> {payment.invoice}
                </p>
                <p>
                  <strong>Client:</strong> {payment.client}
                </p>

                <p>
                  <strong>Amount:</strong> ${payment.amount}
                </p>
                <p>
                  <strong>Status:</strong> {payment.status}
                </p>

                <p>
                  <strong>Method:</strong> {payment.method}
                </p>
              </div>
            </section>

            {/* SECTION: DATES */}
            <section className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-[rgb(25,52,85)] mb-4">
                Dates
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Issued At:</strong> {payment.issuedAt}
                </p>
                <p>
                  <strong>Due At:</strong> {payment.dueAt}
                </p>
              </div>
            </section>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsEditing(true)}>Edit Payment</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
