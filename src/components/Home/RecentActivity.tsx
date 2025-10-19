export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      statusColor: "bg-green-500",
      title: "Shipment #1420 Delivered",
      description: "Order #234 → São Paulo",
      time: "2h",
    },
    {
      id: 2,
      statusColor: "bg-blue-500",
      title: "Shipment #1418 In Transit",
      description: "Order #246 → Miami",
      time: "4h",
    },
    {
      id: 3,
      statusColor: "bg-yellow-600",
      title: "Pending Documents",
      description: "Shipment #237",
      time: "6h",
    },
  ];

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <header className="border-b-2 border-stone-100 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      </header>
      <ul className="space-y-4">
        {activities.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span
                className={`h-3 w-3 rounded-full ${item.statusColor}`}
              ></span>
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
