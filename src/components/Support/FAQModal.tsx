import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTickets } from "@/context/TicketContext";

export default function FAQModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { tickets } = useTickets();

  const faqs = [
    {
      question: "How to track a shipment?",
      answer: "Use your Tracking ID inside My Shipments.",
    },
    {
      question: "Payments not showing?",
      answer: "Make sure the date and status filters are correct.",
    },
    {
      question: "Ticket update is lost?",
      answer:
        "Tickets must be updated via modal or table, not by recreating state.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[rgb(25,52,85)] dark:text-[#E6EDF5]">
            Support FAQs
          </DialogTitle>
        </DialogHeader>

        <Input placeholder="Search FAQs..." className="my-3 text-xs" />

        <div className="space-y-4 text-xs text-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-semibold text-[rgb(25,52,85)] dark:text-[#E6EDF5]">
                {faq.question}
              </p>
              <p className="opacity-80 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Solo para que tengas vista a futuro */}
        <div className="mt-4 text-gray-500 text-[10px]">
          Total active tickets stored: {tickets.length}
        </div>
      </DialogContent>
    </Dialog>
  );
}
