import { useMemo } from "react";
import type { Shipment } from "../types/Shipment";

export interface MonthlyStats {
  Delivered: number;
  Failed: number;
  Pending: number;
}

export function useAnalyticsData(shipments: Shipment[]) {
  const stats = useMemo(() => {
    const result = {
      total: 0,
      status: {
        Delivered: 0,
        Failed: 0,
        Pending: 0,
        "In Transit": 0,
        All: 0,
      },
      months: {} as Record<string, MonthlyStats>,
    };

    shipments.forEach((s) => {
      result.total++;

      // Count by status
      if (result.status[s.status] !== undefined) {
        result.status[s.status]++;
      }

      // Monthly aggregation
      const monthName = new Date(s.date).toLocaleString("default", {
        month: "short",
      });

      if (!result.months[monthName]) {
        result.months[monthName] = { Delivered: 0, Failed: 0, Pending: 0 };
      }

      if (s.status === "Delivered") result.months[monthName].Delivered++;
      if (s.status === "Failed") result.months[monthName].Failed++;
      if (s.status === "Pending" || s.status === "In Transit") {
        result.months[monthName].Pending++;
      }
    });

    return result;
  }, [shipments]);

  // Convert to arrays for charts
  const shipmentsByMonth = useMemo(() => {
    return Object.entries(stats.months).map(([month, values]) => ({
      month,
      ...values,
    }));
  }, [stats]);

  const statusDistribution = useMemo(() => {
    return Object.entries(stats.status).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stats]);

  return {
    total: stats.total,
    delivered: stats.status.Delivered,
    failed: stats.status.Failed,
    pending: stats.status.Pending,
    inTransit: stats.status["In Transit"],
    shipmentsByMonth,
    statusDistribution,
  };
}
