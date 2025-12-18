import AnalyticsStatisticsData from "./AnalyticsStatisticsData";
import TrendsChart from "./TrendsChart";
import StatusPie from "./StatusPie";

import { useShipments } from "../../context/ShipmentsContext";
import { useAnalyticsData } from "@/hooks/useAnalyitcsData";

export default function AnalyticsStatistics() {
  const { shipments } = useShipments();
  const {
    total,
    delivered,
    failed,
    pending,
    shipmentsByMonth,
    statusDistribution,
  } = useAnalyticsData(shipments);

  const headerClass =
    "bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md mb-6";

  // UI cuando no hay datos
  if (shipments.length === 0) {
    return (
      <div className="space-y-6">
        <div className={headerClass}>
          <h1 className="text-2xl font-bold">Analytics & Statistics</h1>
          <p className="text-gray-200">
            Insights will appear once you create shipments.
          </p>
        </div>

        <div className="text-center mt-20 text-gray-500 text-lg">
          No shipments available yet.
          <br />
          <span className="text-sm">
            Create shipments to see analytics, trends, and insights.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={headerClass}>
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
          Insights and performance of your real shipments.
        </p>
      </div>

      <AnalyticsStatisticsData
        total={total}
        delivered={delivered}
        pending={pending}
        failed={failed}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendsChart data={shipmentsByMonth} />
        <StatusPie data={statusDistribution} />
      </div>
    </div>
  );
}
