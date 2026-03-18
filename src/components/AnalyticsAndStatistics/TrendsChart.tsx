import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
  data: { month: string; Delivered: number; Failed: number; Pending: number }[];
}

export default function TrendsChart({ data }: TrendsChartProps) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-[#020617] dark:border-2 dark:border-slate-200/60 shadow-sm dark:shadow-none">
      <h2 className="text-lg font-semibold mb-4">Monthly Shipment Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Delivered" stroke="#22c55e" />
          <Line type="monotone" dataKey="Failed" stroke="#ef4444" />
          <Line type="monotone" dataKey="Pending" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
