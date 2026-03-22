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
    {/* TOTAL */}
    <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm text-center">
      <p className="text-sm text-muted-foreground">TOTAL (FILTERED)</p>
      <p className="text-2xl font-bold">{currency(totalAmount)}</p>
      <p className="text-sm text-muted-foreground">Sum of invoices</p>
    </div>

    {/* PAID */}
    <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm text-center">
      <p className="text-sm text-muted-foreground">PAID</p>
      <p className="text-2xl font-bold">{paidCount}</p>
      <p className="text-sm text-emerald-600 dark:text-emerald-400">
        Settled
      </p>
    </div>

    {/* PENDING */}
    <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm text-center">
      <p className="text-sm text-muted-foreground">PENDING</p>
      <p className="text-2xl font-bold">{pendingCount}</p>
      <p className="text-sm text-amber-600 dark:text-amber-400">
        Awaiting
      </p>
    </div>

    {/* FAILED */}
    <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm text-center">
      <p className="text-sm text-muted-foreground">FAILED</p>
      <p className="text-2xl font-bold">{failedCount}</p>
      <p className="text-sm text-red-600 dark:text-red-400">
        Needs action
      </p>
    </div>
  </div>
);

}
