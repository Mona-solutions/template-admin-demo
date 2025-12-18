import type { Shipment } from "@/types/Shipment";

export default function RecentActivity({
  shipments,
}: {
  shipments: Shipment[];
}) {
  if (!shipments || shipments.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-gray-500">
        No recent activity available.
      </div>
    );
  }

  const recent = shipments.slice(-5).reverse();

  return (
    <div className="px-6 py-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <ul className="space-y-3">
        {recent.map((s) => (
          <li key={s.id} className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-sm">
              {s.status} · {s.orderNumber} → {s.delivery}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
