import type { Person } from "../../types/Person";

interface ClientDirectoryProps {
  clients: Person[];
}

export default function ClientDirectory({ clients }: ClientDirectoryProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-[rgb(25,52,85)] mb-4">
        Clients Directory
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg text-sm table-fixed">
          <thead className="bg-[rgb(25,52,85)] text-white">
            <tr>
              <th className="p-3 text-left w-1/5">Name</th>
              <th className="p-3 text-left w-1/5">Adress</th>
              <th className="p-3 text-left w-1/5">Postal Code</th>
              <th className="p-3 text-left w-1/5">Country</th>
              <th className="p-3 text-left w-1/5">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No clients registered yet.
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="border-t border-gray-200">
                  <td className="p-3 truncate">{c.name}</td>
                  <td className="p-3 truncate">{c.address}</td>
                  <td className="p-3 truncate">{c.postalCode}</td>
                  <td className="p-3 truncate">{c.country}</td>
                  <td className="p-3 truncate">{c.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
