export default function SupportActions({
  onCreateOpen,
  onOpenFaqs,
  onOpenChat,
}: {
  onCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenFaqs: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* CREATE TICKET CARD */}
      <div className="bg-white p-4 2xl:rounded-xl shadow flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[rgb(25,52,85)] mb-1">
            📩 Submit Ticket
          </h2>
          <p className="text-gray-600 text-xs">Create a support request</p>
        </div>

        <button
          onClick={() => onCreateOpen(true)} // ⬅️ abre el modal desde Support.tsx
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-[rgb(25,52,85)] hover:bg-[rgb(35,84,140)] text-white text-xs font-semibold shadow-sm transition"
        >
          + New Ticket
        </button>
      </div>

      {/* FAQ CARD */}
      <div className="bg-white p-4 2xl:rounded-xl shadow hover:shadow-md transition flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>📚</span>
          <h2 className="text-sm font-semibold text-[rgb(25,52,85)]">FAQs</h2>
        </div>

        {/* BOTÓN CHICO alineado a la derecha */}
        <button
          onClick={() => onOpenFaqs(true)}
          className="px-3 py-1 bg-[rgb(25,52,85)] text-white text-xs font-semibold rounded-md shadow-sm hover:bg-[rgb(20,46,75)] transition"
        >
          + FAQs
        </button>
      </div>

      {/* LIVE CHAT CARD */}
      <div className="bg-white p-4 2xl:rounded-xl shadow flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span>💬</span>
            <h2 className="text-lg font-semibold text-[rgb(25,52,85)]">
              Live Chat
            </h2>
          </div>
          <p className="text-gray-600 text-xs">
            Chat with support in real time
          </p>
        </div>

        <button
          onClick={() => onOpenChat(true)}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-green-600 hover:bg-green-800 text-white text-xs font-semibold shadow-sm transition"
        >
          + Chat
        </button>
      </div>
    </div>
  );
}
