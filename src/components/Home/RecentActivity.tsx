import type { Shipment } from "@/types/Shipment";

export default function RecentActivity({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const recent = shipments.slice(-5).reverse();

  if (recent.length === 0) return null;

  return (
    <div className="px-6 py-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-[#E6EDF5] mb-4">
        Recent Activity
      </h2>

      <ul className="space-y-3">
        {recent.map((s) => (
          <li key={s.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {s.status} · {s.orderNumber} → {s.delivery}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
