import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface StatusPieProps {
  data: { name: string; value: number }[];
}

const COLORS_DARK: Record<string, string> = {
  Delivered: "#16a34a",
  Failed: "#ef4444",
  "In Transit": "#3b82f6",
  Pending: "#facc15",
  All: "#94a3b8",
};

const COLORS_LIGTH: Record<string, string> = {
  Delivered: "#16a34a",
  Failed: "#dc2626",
  "In Transit": "#2563eb",
  Pending: "#eab308",
  All: "#64748b",
};

export default function StatusPie({ data }: StatusPieProps) {
  const isDark = document.documentElement.classList.contains("dark");

  const palette = isDark ? COLORS_DARK : COLORS_LIGTH;

  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-[#020617] dark:border-2 dark:border-slate-200/60 shadow-sm dark:shadow-none">
      <h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={palette[entry.name as keyof typeof palette] ?? "#94a3b8"}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
