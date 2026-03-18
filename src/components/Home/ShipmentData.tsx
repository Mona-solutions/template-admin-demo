import type { Shipment } from "@/types/Shipment";

export default function ShipmentData({ shipments }: { shipments: Shipment[] }) {
  const inProgress = shipments.filter((s) => s.status !== "Delivered").length;

  const deliveredThisMonth = shipments.filter((s) => {
    const d = new Date(s.date);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  const pendingOrFailed = shipments.filter(
    (s) => s.status === "Pending" || s.status === "Failed",
  ).length;

  const markets = new Set(shipments.map((s) => s.delivery)).size;

  if (shipments.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-[#E6EDF5]">
          No shipments yet
        </h2>
        <p className="text-gray-500 mb-6 dark:text-[#E6EDF5]">
          Start by creating your first shipment.
        </p>

        <button
          onClick={() =>
            (window.location.href = "/app/my-shipments?create=true")
          }
          className="px-6 py-3 bg-[rgb(25,52,85)] text-white rounded-md hover:bg-[rgb(45,84,135)] transition dark:bg-[#DEE6F0] dark:font-semibold  dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
        >
          Create Shipment
        </button>
      </div>
    );
  }

  function MetricCard({ title, value }: { title: string; value: number }) {
    return (
      <div className="px-6 py-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
        <h3 className="text-sm text-stone-600 dark:text-gray-200">{title}</h3>
        <p className="font-bold text-3xl text-[rgb(25,52,85)] dark:text-[#DEE6F0] mb-2">
          {value}
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-4 py-4 gap-6">
      <MetricCard title="Shipments in Progress" value={inProgress} />
      <MetricCard title="Deliveries this month" value={deliveredThisMonth} />
      <MetricCard title="Pending & Failed Shipments" value={pendingOrFailed} />
      <MetricCard title="Active Markets" value={markets} />
    </section>
  );
}
