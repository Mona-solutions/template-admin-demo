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
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full border-collapse text-sm text-gray-800">
        <thead className="bg-gray-100 text-[rgb(25,52,85)] ">
          <tr>
            <th className="p-3 font-semibold">Order #</th>
            <th className="p-3 font-semibold">Tracking ID</th>
            <th className="p-3 font-semibold">Sender</th>
            <th className="p-3 font-semibold">Recipient</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {shipments.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No shipments found.
              </td>
            </tr>
          )}

          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className="border-t hover:bg-gray-50 transition"
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
