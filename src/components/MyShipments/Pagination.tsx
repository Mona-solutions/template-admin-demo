export default function Pagination() {
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">Showing 1–3 of 50 shipments</p>
      <div className="space-x-2">
        <button className="px-3 py-1 border rounded">Prev</button>
        <button className="px-3 py-1 border rounded bg-[rgb(25,52,85)] text-white dark:bg-white dark:text-[rgb(25,52,85)]">
          1
        </button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}
