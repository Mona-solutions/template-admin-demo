import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  SHIPMENT_DELIVERY_LOCATION,
  SHIPMENT_PICKUP_LOCATION,
  SHIPMENT_TYPE,
  SHIPMENT_STATUSES_FOR_FORM,
  SHIPMENT_SERVICE,
} from "../../types/Shipment";

import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";

import { Button } from "../../components/ui/button";

export default function ShipmentForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  form: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
}) {
  const updateDate = (date: Date | undefined) => {
    onChange("date", date || form.date);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <h2 className="font-semibold text-lg">Shipment Details</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Number</label>
          <input
            type="text"
            value={form.orderNumber}
            onChange={(e) => onChange("orderNumber", e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-[rgb(25,52,85)] focus:ring-0 outline-none dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
            placeholder="Order Number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tracking ID</label>
          <input
            type="text"
            value={form.trackingId}
            readOnly
            className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-600 dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={form.status}
            onValueChange={(v) => onChange("status", v)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHIPMENT_STATUSES_FOR_FORM.map((s: string) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select value={form.type} onValueChange={(v) => onChange("type", v)}>
            <SelectTrigger className="border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHIPMENT_TYPE.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Service</label>
          <Select
            value={form.service}
            onValueChange={(v) => onChange("service", v)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHIPMENT_SERVICE.map((svc: string) => (
                <SelectItem key={svc} value={svc}>
                  {svc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Pickup</label>
          <Select
            value={form.pickup}
            onValueChange={(v) => onChange("pickup", v)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHIPMENT_PICKUP_LOCATION.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Delivery</label>
          <Select
            value={form.delivery}
            onValueChange={(v) => onChange("delivery", v)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHIPMENT_DELIVERY_LOCATION.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sender</label>
          <input
            type="text"
            value={form.sender}
            onChange={(e) => onChange("sender", e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-[rgb(25,52,85)] focus:ring-0 outline-none dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sender Email</label>
          <input
            type="email"
            value={form.senderEmail}
            onChange={(e) => onChange("senderEmail", e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-[rgb(25,52,85)] focus:ring-0 outline-none dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
            placeholder="example@domain.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient</label>
          <input
            type="text"
            value={form.recipient}
            onChange={(e) => onChange("recipient", e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-[rgb(25,52,85)] focus:ring-0 outline-none dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient Email</label>
          <input
            type="email"
            value={form.recipientEmail}
            onChange={(e) => onChange("recipientEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[rgb(25,52,85)] focus:ring-0 outline-none dark:bg-black dark:text-slate-100 dark:border-slate-700 dark:placeholder:text-slate-200"
            placeholder="example@domain.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Shipment Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center text-left"
              >
                {format(form.date, "PPP")}
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.date}
                onSelect={updateDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm text-gray-600 dark:text-[#E6EDF5] hover:text-gray-700 dark:hover:text-white hover:bg-muted/60 dark:hover:bg-muted/30 transition"
          >
            Cancel
          </button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[rgb(25,52,85)] hover:bg-[rgb(45,84,135)] dark:text-[#E6EDF5]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
