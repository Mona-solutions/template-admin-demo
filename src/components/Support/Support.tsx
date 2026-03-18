import { useState } from "react";
import SupportActions from "./SupportActions";
import TicketsTable from "./TicketsTable";
import CreateTicketModal from "./CreateTicketModal";
import FAQModal from "./FAQModal";
import LiveChatModal from "./LiveChatModal";

import { useTickets } from "@/context/TicketContext";

export default function Support() {
  const { tickets, addTicket, updateTicket, deleteTicket } = useTickets();

  const [open, setOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md dark:bg-[#DEE6F0] dark:text-[rgb(25,52,85)]">
        <h1 className="text-2xl font-bold">Support</h1>
        <p className="text-gray-200  dark:text-gray-800">
          Get help, report issues, or find answers to common questions.
        </p>
      </div>

      <SupportActions
        onCreateOpen={setOpen}
        onOpenFaqs={setOpenFaqs}
        onOpenChat={setOpenChat}
      />

      <CreateTicketModal
        open={open}
        onClose={() => setOpen(false)}
        addTicket={addTicket}
      />

      <FAQModal open={openFaqs} onClose={() => setOpenFaqs(false)} />
      <LiveChatModal open={openChat} onClose={() => setOpenChat(false)} />

      <TicketsTable
        tickets={tickets}
        updateTicket={updateTicket}
        deleteTicket={deleteTicket}
      />
    </div>
  );
}
