interface PaymentsDataProps {
  totalAmount: number;
  paidCount: number;
  pendingCount: number;
  failedCount: number;
  currency: (amount: number) => string;
}

export default function PaymentsData({
  totalAmount,
  paidCount,
  pendingCount,
  failedCount,
  currency,
}: PaymentsDataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-sm text-gray-500">TOTAL (FILTERED)</p>
        <p className="text-2xl font-bold">{currency(totalAmount)}</p>
        <p className="text-gray-600 text-sm">Sum of invoices</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-sm text-gray-500">PAID</p>
        <p className="text-2xl font-bold">{paidCount}</p>
        <p className="text-green-600 text-sm">Settled</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-sm text-gray-500">PENDING</p>
        <p className="text-2xl font-bold">{pendingCount}</p>
        <p className="text-yellow-600 text-sm">Awaiting</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-sm text-gray-500">FAILED</p>
        <p className="text-2xl font-bold">{failedCount}</p>
        <p className="text-red-600 text-sm">Needs action</p>
      </div>
    </div>
  );
}
