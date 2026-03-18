import type { Ticket } from "@/context/TicketContext";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TicketDetailsModal from "./TicketDetailsModal";

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
  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState<Ticket | null>(null);

  const handleView = (t: Ticket) => {
    setSelected(t);
    setOpenDetails(true);
  };

  return (
    <div className="rounded-xl overflow-hidden backdrop-blur border shadow-lg dark:border-2 dark:border-slate-200/60">
      <h2 className="text-md text-center font-semibold p-4 border-b border-gray-200 dark:border-slate-800">
        Recent Tickets
      </h2>
      <table className="w-full text-sm text-gray-800">
        <thead className="bg-muted/50 text-foreground border-b dark:!border-transparent dark:bg-[#DEE6F0]">
          <tr>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">ID</th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Subject
            </th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Category
            </th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Priority
            </th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Status
            </th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Created
            </th>
            <th className="p-3 font-semibold dark:text-[rgb(25,52,85)]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-3 text-center dark:text-gray-200">#{t.id}</td>
              <td className="p-3 text-center dark:text-gray-200">
                {t.subject}
              </td>
              <td className="p-3 text-center dark:text-gray-200">
                {t.category}
              </td>
              <td className="p-3 text-center dark:text-gray-200">
                {t.priority}
              </td>

              <td className="p-3 text-center dark:text-gray-200">
                <StatusBadge status={t.status} />
              </td>

              <td className="p-3 text-center dark:text-gray-200">
                {t.createdAt}
              </td>

              <td className="p-3 gap-3 text-center">
                <div className="flex justify-center items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(t)}
                    className="dark:text-gray-200"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateTicket({
                        ...t,
                        status: "Closed",
                      })
                    }
                    className="dark:text-gray-200"
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
              <td colSpan={7} className="p-6 text-center text-gray-400">
                No tickets yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <TicketDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        ticket={selected}
        onCloseTicket={(ticket) => {
          updateTicket(ticket);
          setSelected(ticket);
        }}
        onDeleteTicket={(id) => {
          deleteTicket(id);
          setOpenDetails(false);
        }}
      />
    </div>
  );
}
