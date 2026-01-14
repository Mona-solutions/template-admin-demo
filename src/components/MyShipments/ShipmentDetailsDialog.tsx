import { useState } from "react";
import type { Shipment } from "../../types/Shipment";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ShipmentForm from "./ShipmentForm";

export default function ShipmentDetailsDialog({
  shipment,
  children,
  onUpdate,
}: {
  shipment: Shipment;
  children: React.ReactNode;
  onUpdate: (shipment: Shipment) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<Shipment>({
    ...shipment,
    date: shipment.date, // string, no Date
  });

  const change = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await onUpdate({
      ...form,
      date: new Date(form.date).toISOString(),
    });

    setIsSubmitting(false);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          max-w-3xl
          bg-white text-slate-900
          dark:bg-[#020617] dark:text-slate-100
          border border-slate-200 dark:border-slate-800
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-[rgb(25,52,85)]
              dark:text-slate-100
            "
          >
            {isEditing ? "Edit Shipment" : "Shipment Details"}
          </DialogTitle>

          <DialogDescription
            className="
              text-slate-600
              dark:text-slate-400
            "
          >
            {isEditing
              ? "Modify the shipment information below."
              : "View complete shipment information here."}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <ShipmentForm
            form={form}
            onChange={change}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => {
              setIsEditing(false);
              setForm({ ...shipment, date: shipment.date });
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* General */}
            <section
              className="
                rounded-lg shadow p-5
                bg-white border border-slate-100
                dark:bg-[#0b1220] dark:border-slate-800
              "
            >
              <h3
                className="
                  text-lg font-semibold mb-4
                  text-[rgb(25,52,85)]
                  dark:text-slate-100
                "
              >
                General
              </h3>

              <div
                className="
                  grid grid-cols-2 gap-y-2 text-sm
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Order Number:
                  </strong>{" "}
                  {shipment.orderNumber}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Tracking ID:
                  </strong>{" "}
                  {shipment.trackingId}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Status:
                  </strong>{" "}
                  {shipment.status}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Type:
                  </strong>{" "}
                  {shipment.type}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Service:
                  </strong>{" "}
                  {shipment.service}
                </p>
              </div>
            </section>

            {/* Sender & Recipient */}
            <section
              className="
                rounded-lg shadow p-5
                bg-white border border-slate-100
                dark:bg-[#0b1220] dark:border-slate-800
              "
            >
              <h3
                className="
                  text-lg font-semibold mb-4
                  text-[rgb(25,52,85)]
                  dark:text-slate-100
                "
              >
                Sender & Recipient
              </h3>

              <div
                className="
                  grid grid-cols-2 gap-y-2 text-sm
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Sender:
                  </strong>{" "}
                  {shipment.sender}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Recipient:
                  </strong>{" "}
                  {shipment.recipient}
                </p>
              </div>
            </section>

            {/* Logistics */}
            <section
              className="
                rounded-lg shadow p-5
                bg-white border border-slate-100
                dark:bg-[#0b1220] dark:border-slate-800
              "
            >
              <h3
                className="
                  text-lg font-semibold mb-4
                  text-[rgb(25,52,85)]
                  dark:text-slate-100
                "
              >
                Logistics
              </h3>

              <div
                className="
                  grid grid-cols-2 gap-y-2 text-sm
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Pickup:
                  </strong>{" "}
                  {shipment.pickup}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Delivery:
                  </strong>{" "}
                  {shipment.delivery}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Date:
                  </strong>{" "}
                  {shipment.date ? new Date(shipment.date).toLocaleDateString() : "—"}
                </p>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="
                  px-5 py-2 rounded-md transition
                  bg-[rgb(25,52,85)] text-white hover:bg-[rgb(18,40,68)]
                  dark:bg-[rgb(25,52,85)] dark:hover:bg-[rgb(35,70,115)]
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-[rgb(25,52,85)]
                  dark:focus:ring-offset-[#020617]
                "
              >
                Edit Shipment
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
