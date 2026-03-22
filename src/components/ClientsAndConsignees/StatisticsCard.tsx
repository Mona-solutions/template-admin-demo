export default function StatisticsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="font-medium text-sm uppercase text-stone-400">
          TOTAL CLIENTS
        </p>
        <p className="text-2xl font-bold">120</p>
        <p className="text-green-600 text-sm">+10 vs last month</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="font-medium text-sm uppercase text-stone-400">
          ACTIVE CONSIGNEES
        </p>
        <p className="text-2xl font-bold">340</p>
        <p className="text-green-600 text-sm">+15 vs last month</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="font-medium text-sm uppercase text-stone-400">
          FREQUENT CONSIGNEES
        </p>
        <p className="text-2xl font-bold">25</p>
        <p className="text-gray-600 text-sm">Top recurring</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="font-medium text-sm uppercase text-stone-400">
          ISSUES / CLAIMS
        </p>
        <p className="text-2xl font-bold">5</p>
        <p className="text-orange-600 text-sm">⚠ Pending resolution</p>
      </div>
    </div>
  );
}
