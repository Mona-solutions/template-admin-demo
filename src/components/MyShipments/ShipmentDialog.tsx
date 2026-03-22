import { useState } from "react";
import type { ShipmentCreateData } from "../../types/ShipmentCreateData";
import { useShipments } from "../../context/ShipmentsContext";

import { useClients } from "@/context/ClientsContext";
import { useConsignees } from "@/context/ConsigneesContext";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ShipmentForm from "./ShipmentForm";
import { generateTrackingId } from "../RegisterShippment/RegisterShippment";

export default function ShipmentDialog() {
  const { create } = useShipments();

  const { addClient } = useClients();
  const { addConsignee } = useConsignees();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<ShipmentCreateData>({
    orderNumber: "",
    trackingId: generateTrackingId(),
    status: "Pending",
    type: "Package",
    pickup: "Warehouse",
    delivery: "Home Delivery",
    service: "Standard",
    date: new Date().toISOString(),

    sender: "",
    senderEmail: "",
    recipient: "",
    recipientEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.sender && form.senderEmail) {
      addClient({
        id: crypto.randomUUID(),
        name: form.sender,
        email: form.senderEmail,
        address: "",
        postalCode: "",
        country: "",
      });
    }

    if (form.recipient && form.recipientEmail) {
      addConsignee({
        id: crypto.randomUUID(),
        name: form.recipient,
        email: form.recipientEmail,
        address: "",
        postalCode: "",
        country: "",
      });
    }

    create({
      ...form,
      date: new Date(form.date).toISOString(),
    });

    setOpen(false);
    setIsSubmitting(false);

    // reset form
    setForm({
      orderNumber: "",
      trackingId: generateTrackingId(),
      status: "Pending",
      type: "Package",
      pickup: "Warehouse",
      delivery: "Home Delivery",
      service: "Standard",
      date: new Date().toISOString(),
      sender: "",
      senderEmail: "",
      recipient: "",
      recipientEmail: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className=" flex items-center gap-2 px-4 py-2 rounded-md font-semibold shadow bg-white text-[rgb(25,52,85)] hover:bg-gray-100 dark:text-[#E6EDF5] dark:bg-[rgb(25,52,85)] dark:hover:bg-[rgb(56, 94, 144)]"
        >
          <span className="text-lg">＋</span>
          New Shipment
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[rgb(25,52,85)] dark:text-[#E6EDF5]">
            Create Shipment
          </DialogTitle>
          <DialogDescription>
            Enter the shipment details below.
          </DialogDescription>
        </DialogHeader>

        <ShipmentForm
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
