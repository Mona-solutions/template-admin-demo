import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import type { Ticket } from "@/context/TicketContext";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  addTicket: (t: Ticket) => void;
}

export default function CreateTicketModal({
  open,
  onClose,
  addTicket,
}: CreateTicketModalProps) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category] = useState("Technical");
  const [priority] = useState("Medium");

  function handleSubmit() {
    if (!subject.trim()) return;

    const newTicket: Ticket = {
      id: Date.now(),
      subject,
      description,
      category,
      priority,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
    };

    addTicket(newTicket);
    onClose();
    setSubject("");
    setDescription("");
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Textarea
            placeholder="Describe your issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            className="bg-[rgb(25,52,85)] text-white w-full"
          >
            Submit Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
