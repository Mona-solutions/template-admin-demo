import type { Shipment } from "../../types/Shipment";

interface ShipmentsTableProps {
  shipments: Shipment[];
  onDelete: (id: string) => void;
}

export default function ShipmentsTable({
  shipments,
  onDelete,
}: ShipmentsTableProps) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Order #</th>
            <th className="p-3">Tracking ID</th>
            <th className="p-3">Sender</th>
            <th className="p-3">Recipient</th>
            <th className="p-3">Status</th>
            <th className="p-3">Type</th>
            <th className="p-3">Service</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{s.orderNumber}</td>
              <td className="p-3">{s.trackingId}</td>
              <td className="p-3">{s.sender}</td>
              <td className="p-3">{s.recipient}</td>
              <td className="p-3">{s.status}</td>
              <td className="p-3">{s.type}</td>
              <td className="p-3">{s.service}</td>
              <td className="p-3">{s.date}</td>
              <td className="p-3">
                <button
                  onClick={() => onDelete(s.id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {shipments.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-500">
                No shipments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
