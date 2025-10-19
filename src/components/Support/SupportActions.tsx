export default function SupportActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <button className="bg-white p-4 rounded shadow hover:shadow-md transition">
        <h3 className="font-semibold text-[rgb(25,52,85)] mb-2">
          📩 Submit Ticket
        </h3>
        <p className="text-gray-600 text-sm">
          Report an issue or ask a question.
        </p>
      </button>
      <button className="bg-white p-4 rounded shadow hover:shadow-md transition">
        <h3 className="font-semibold text-[rgb(25,52,85)] mb-2">📚 FAQs</h3>
        <p className="text-gray-600 text-sm">
          Find answers to common questions.
        </p>
      </button>
      <button className="bg-white p-4 rounded shadow hover:shadow-md transition">
        <h3 className="font-semibold text-[rgb(25,52,85)] mb-2">
          💬 Live Chat
        </h3>
        <p className="text-gray-600 text-sm">
          Chat with a support agent in real time.
        </p>
      </button>
    </div>
  );
}
