import ShipmentDetailsDialog from "../MyShipments/ShipmentDetailsDialog";
import type { Shipment } from "../../types/Shipment";
import { Button } from "@/components/ui/button";

export default function ShipmentsTable({
  shipments,
  onEdit,
  onDelete,
}: {
  shipments: Shipment[];
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-border bg-card text-card-foreground shadow-sm  dark:border-2
    dark:border-slate-200/60"
    >
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/50 text-foreground dark:bg-[#DEE6F0] dark:text-[rgb(25,52,85)]">
          <tr className="border-b border-border">
            <th className="p-3 font-semibold text-center">Order #</th>
            <th className="p-3 font-semibold text-center">Tracking ID</th>
            <th className="p-3 font-semibold text-center">Sender</th>
            <th className="p-3 font-semibold text-center">Recipient</th>
            <th className="p-3 font-semibold text-center">Status</th>
            <th className="p-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {shipments.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                No shipments found.
              </td>
            </tr>
          )}

          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className="transition-colors hover:bg-muted/40"
            >
              <td
                className="p-3 cursor-pointer text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {shipment.orderNumber}
              </td>

              <td className="p-3 text-center">{shipment.trackingId}</td>
              <td className="p-3 text-center">{shipment.sender}</td>
              <td className="p-3 text-center">{shipment.recipient}</td>
              <td className="p-3 text-center">{shipment.status}</td>

              <td className="p-3 text-center">
                <div className="flex justify-center items-center gap-3">
                  <ShipmentDetailsDialog shipment={shipment} onUpdate={onEdit}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </ShipmentDetailsDialog>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(shipment.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
