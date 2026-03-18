interface KpiCardsProps {
  total: number;
  delivered: number;
  pending: number;
  failed: number;
}

export default function KpiCards({
  total,
  delivered,
  pending,
  failed,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center dark:bg-[#020617] dark:border-2 dark:border-slate-200/60">
        <p className="text-sm text-gray-500 dark:text-gray-200">
          TOTAL SHIPMENTS
        </p>
        <p className="text-2xl font-bold">{total}</p>
        <p className="text-gray-600 text-sm dark:text-gray-200">All statuses</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center dark:bg-[#020617] dark:border-2 dark:border-slate-200/60">
        <p className="text-sm text-gray-500 dark:text-gray-200">DELIVERED</p>
        <p className="text-2xl font-bold">{delivered}</p>
        <p className="text-green-600 text-sm">Successful</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center dark:bg-[#020617] dark:border-2 dark:border-slate-200/60">
        <p className="text-sm text-gray-500 dark:text-gray-200">PENDING</p>
        <p className="text-2xl font-bold">{pending}</p>
        <p className="text-yellow-600 text-sm">Awaiting</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center dark:bg-[#020617] dark:border-2 dark:border-slate-200/60">
        <p className="text-sm text-gray-500 dark:text-gray-200">FAILED</p>
        <p className="text-2xl font-bold">{failed}</p>
        <p className="text-red-600 text-sm">Needs action</p>
      </div>
    </div>
  );
}
