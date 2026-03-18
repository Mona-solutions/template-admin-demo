import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Ticket } from "@/context/TicketContext";
import StatusBadge from "./StatusBadge";

interface TicketDetailsModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onCloseTicket: (t: Ticket) => void;
  onDeleteTicket: (id: number) => void;
}

export default function TicketDetailsModal({
  open,
  onClose,
  ticket,
  onCloseTicket,
  onDeleteTicket,
}: TicketDetailsModalProps) {
  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ticket #{ticket.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge status={ticket.status} />
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Subject</span>
            <span className="text-right font-medium">{ticket.subject}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Category</span>
            <span className="text-right">{ticket.category}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Priority</span>
            <span className="text-right">{ticket.priority}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Created</span>
            <span className="text-right">{ticket.createdAt}</span>
          </div>

          <div className="pt-2">
            <div className="text-muted-foreground mb-1">Description</div>
            <div className="rounded-md border p-3 whitespace-pre-wrap">
              {ticket.description?.trim()
                ? ticket.description
                : "No description."}
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <Button
              variant="outline"
              onClick={() => onCloseTicket({ ...ticket, status: "Closed" })}
              disabled={ticket.status === "Closed"}
              className="flex-1"
            >
              Close ticket
            </Button>

            <Button
              variant="destructive"
              onClick={() => onDeleteTicket(ticket.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
