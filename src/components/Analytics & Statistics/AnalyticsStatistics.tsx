import { useMemo } from "react";
import AnalyticsStatisticsData from "./AnalyticsStatisticsData";
import TrendsChart from "./TrendsChart";
import StatusPie from "./StatusPie";

const BRAND = "rgb(25,52,85)";

const shipmentsByMonth = [
  { month: "Jan", Delivered: 120, Failed: 8, Pending: 15 },
  { month: "Feb", Delivered: 150, Failed: 5, Pending: 10 },
  { month: "Mar", Delivered: 180, Failed: 12, Pending: 20 },
  { month: "Apr", Delivered: 200, Failed: 9, Pending: 14 },
  { month: "May", Delivered: 170, Failed: 7, Pending: 11 },
];

const statusDistribution = [
  { name: "Delivered", value: 520 },
  { name: "In Transit", value: 140 },
  { name: "Pending", value: 60 },
  { name: "Failed", value: 30 },
];

export default function AnalyticsStatistics() {
  const categoryHeader = `bg-[${BRAND}] text-white p-6 rounded-lg shadow-md mb-6`;

  const totals = useMemo(() => {
    return {
      total: statusDistribution.reduce((sum, s) => sum + s.value, 0),
      delivered:
        statusDistribution.find((s) => s.name === "Delivered")?.value || 0,
      failed: statusDistribution.find((s) => s.name === "Failed")?.value || 0,
      pending: statusDistribution.find((s) => s.name === "Pending")?.value || 0,
    };
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={categoryHeader}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6h13M9 5h13M5 5v14h2"
            />
          </svg>
          Analytics & Statistics
        </h1>
        <p className="text-gray-200">
          Insights and performance of your shipments.
        </p>
      </div>

      {/* Analytics & Statistics Data */}
      <AnalyticsStatisticsData
        total={totals.total}
        delivered={totals.delivered}
        pending={totals.pending}
        failed={totals.failed}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendsChart data={shipmentsByMonth} />
        <StatusPie data={statusDistribution} />
      </div>
    </div>
  );
}
