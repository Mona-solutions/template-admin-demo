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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    await onUpdate({
      ...form,
      date: new Date(form.date).toISOString(), // convertir correctamente
    });

    setIsSubmitting(false);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-[rgb(25,52,85)]">
            {isEditing ? "Edit Shipment" : "Shipment Details"}
          </DialogTitle>
          <DialogDescription>
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
              setForm({ ...shipment });
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* General */}
            <section className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-[rgb(25,52,85)] mb-4">
                General
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Order Number:</strong> {shipment.orderNumber}
                </p>
                <p>
                  <strong>Tracking ID:</strong> {shipment.trackingId}
                </p>
                <p>
                  <strong>Status:</strong> {shipment.status}
                </p>
                <p>
                  <strong>Type:</strong> {shipment.type}
                </p>
                <p>
                  <strong>Service:</strong> {shipment.service}
                </p>
              </div>
            </section>

            {/* Sender & Recipient */}
            <section className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-[rgb(25,52,85)] mb-4">
                Sender & Recipient
              </h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Sender:</strong> {shipment.sender}
                </p>
                <p>
                  <strong>Recipient:</strong> {shipment.recipient}
                </p>
              </div>
            </section>

            {/* Logistics */}
            <section className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-[rgb(25,52,85)] mb-4">
                Logistics
              </h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Pickup:</strong> {shipment.pickup}
                </p>
                <p>
                  <strong>Delivery:</strong> {shipment.delivery}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(shipment.date).toLocaleDateString()}
                </p>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 rounded-md bg-[rgb(25,52,85)] text-white hover:bg-[rgb(18,40,68)] transition"
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
