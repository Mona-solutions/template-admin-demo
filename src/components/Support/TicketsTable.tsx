import type { TicketStatus } from "./StatusBadge";
import StatusBadge from "./StatusBadge";

export interface Ticket {
  id: number;
  subject: string;
  status: TicketStatus;
  createdAt: string;
}

export interface TicketsTableProps {
  tickets: Ticket[];
}

export default function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <div className="bg-white shadow rounded overflow-hidden ">
      <h2 className="text-lg font-semibold p-4 border-b">Recent Tickets</h2>
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t ">
              <td className="p-3">#{t.id}</td>
              <td className="p-3">{t.subject}</td>
              <td className="p-3">
                <StatusBadge status={t.status} />
              </td>
              <td className="p-3">{t.createdAt}</td>
              <td className="p-3">
                <button className="text-[rgb(25,52,85)] hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
          {tickets.length === 0 && (
            <tr>
              <td className="p-6 text-center text-gray-500" colSpan={5}>
                No tickets yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
