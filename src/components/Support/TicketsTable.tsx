import type { Ticket } from "@/context/TicketContext";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";

interface TicketsTableProps {
  tickets: Ticket[];
  updateTicket: (t: Ticket) => void;
  deleteTicket: (id: number) => void;
}

export default function TicketsTable({
  tickets,
  updateTicket,
  deleteTicket,
}: TicketsTableProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="text-md font-semibold p-4 border-b">Recent Tickets</h2>

      <table className="w-full text-sm text-gray-800">
        <thead className="bg-gray-100 text-[rgb(25,52,85)] ">
          <tr>
            <th className="p-3 font-semibold">ID</th>
            <th className="p-3 font-semibold">Subject</th>
            <th className="p-3 font-semibold">Category</th>
            <th className="p-3 font-semibold">Priority</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Created</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-3 text-center">#{t.id}</td>
              <td className="p-3 text-center">{t.subject}</td>
              <td className="p-3 text-center">{t.category}</td>
              <td className="p-3 text-center">{t.priority}</td>

              <td className="p-3 text-center">
                <StatusBadge status={t.status} />
              </td>

              <td className="p-3 text-center">{t.createdAt}</td>

              <td className="p-3  gap-3 text-center">
                <div className="flex justify-center items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateTicket({
                        ...t,
                        status: "Closed",
                      })
                    }
                  >
                    Close
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTicket(t.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-500">
                No tickets yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
