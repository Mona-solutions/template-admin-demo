import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payment: any) => void;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  onSave,
}: PaymentDialogProps) {
  const [form, setForm] = useState({
    invoice: "",
    client: "",
    amount: "",
    method: "",
    status: "",
    issuedAt: "",
    dueAt: "",
  });

  const handleChange = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.invoice || !form.client || !form.amount) return;
    onSave({
      ...form,
      amount: parseFloat(form.amount),
      issuedAt: form.issuedAt || new Date().toISOString().split("T")[0],
      dueAt:
        form.dueAt ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
    });
    onOpenChange(false);
    setForm({
      invoice: "",
      client: "",
      amount: "",
      method: "",
      status: "",
      issuedAt: "",
      dueAt: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Invoice #"
            value={form.invoice}
            onChange={(e) => handleChange("invoice", e.target.value)}
          />
          <Input
            placeholder="Client name"
            value={form.client}
            onChange={(e) => handleChange("client", e.target.value)}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />

          <Select onValueChange={(v) => handleChange("method", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleChange("status", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button className="bg-[#193455]" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
