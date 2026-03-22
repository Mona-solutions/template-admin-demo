export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<TicketStatus, string> = {
    Open: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status]}`}>
      {status}
    </span>
  );
}
