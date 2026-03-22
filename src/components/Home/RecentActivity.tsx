import type { Shipment } from "@/types/Shipment";

export default function RecentActivity({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const recent = shipments.slice(-5).reverse();

  return (
    <div className="px-6 py-4 rounded-lg">
      <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-[#E6EDF5]">Recent Activity</h2>

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
