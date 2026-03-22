import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LiveChatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "Support", text: "Hi! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e?: any) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "You", text: input }]);
    setInput("");
  };

  return open ? (
    <div className="fixed bottom-4 right-4 w-[260px] bg-white shadow-lg rounded-xl border animate-in slide-in-from-bottom dark:bg-muted/0 text-slate-100 placeholder:text-slate-500 border border-white/10">
      {/* Header */}
      <div className="bg-[rgb(25,52,85)] text-white px-4 py-2 rounded-t-xl flex justify-between items-center dark:bg-white text-[rgb(25,52,85)] dark:text-[rgb(25,52,85)]">
        <span className="text-xs font-semibold">💬 Live Support</span>
        <button
          onClick={onClose}
          className="text-xs opacity-70 hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="h-[180px] overflow-y-auto p-3 space-y-2 text-xs text-gray-800">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.from === "You" ? "text-right" : "text-left"}
          >
            <p className="font-semibold text-[rgb(25,52,85)] dark:text-[#E6EDF5]">{m.from}:</p>
            <p className="opacity-90 text-muted-foreground">{m.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write message..."
          className="mb-2 text-xs"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-[rgb(25,52,85)] text-white rounded-md py-1 text-[10px] font-semibold hover:bg-[rgb(20,46,75)] transition dark:bg-white text-[rgb(25,52,85)] hover:bg-gray-100 dark:text-[rgb(25,52,85)] dark:hover:bg-slate-400"
        >
          Send
        </button>
      </form>
    </div>
  ) : null;
}
