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
    (s) => s.status !== "Delivered"
  ).length;

  const markets = new Set(shipments.map((s) => s.delivery)).size;

  // ✅ Estado vacío — sin envíos
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
          className="px-6 py-3 bg-[rgb(25,52,85)] text-white rounded-md hover:bg-[rgb(18,40,68)] transition dark:bg-[#DEE6F0] dark:font-semibold hover:bg-gray-100 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
        >
          Create Shipment
        </button>
      </div>
    );
  }

  function MetricCard({
    title,
    value,
    change,
  }: {
    title: string;
    value: number;
    change: string;
  }) {
    return (
      <div className="px-6 shadow-md py-6 rounded-lg">
        <h3 className="text-sm uppercase text-stone-500">{title}</h3>
        <p className="font-bold text-3xl text-[rgb(25,52,85)] mb-2">{value}</p>
        <p className="font-semibold text-green-600">{change}</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-4 py-4 gap-6">
      <MetricCard title="Shipments in Progress" value={inProgress} change="" />
      <MetricCard
        title="Deliveries this month"
        value={deliveredThisMonth}
        change=""
      />
      <MetricCard
        title="Pending & Failed Shipments"
        value={pendingOrFailed}
        change=""
      />
      <MetricCard title="Active Markets" value={markets} change="" />
    </section>
  );
}
