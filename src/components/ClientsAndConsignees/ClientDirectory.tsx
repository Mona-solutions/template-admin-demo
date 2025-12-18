import { useState } from "react";
import { useClients } from "@/context/ClientsContext";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { Client } from "@/context/ClientsContext";

export default function ClientDirectory() {
  const { clients, updateClient, deleteClient } = useClients();

  // 🔥 ESTE ERA EL PROBLEMA: editing = null -> tipo "never"
  const [editing, setEditing] = useState<Client | null>(null);

  const handleSave = () => {
    if (editing) {
      updateClient(editing);
      setEditing(null);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-[rgb(25,52,85)] mb-4">
        Clients Directory
      </h2>

      <div className="bg-white shadow rounded overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[rgb(25,52,85)] text-white">
              <TableHead className="text-white w-[18%]">Name</TableHead>
              <TableHead className="text-white w-[18%]">Address</TableHead>
              <TableHead className="text-white w-[14%]">Postal Code</TableHead>
              <TableHead className="text-white w-[14%]">Country</TableHead>
              <TableHead className="text-white w-[18%]">Email</TableHead>
              <TableHead className="text-white text-center w-[18%]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-6 text-center text-gray-500"
                >
                  No clients registered yet.
                </TableCell>
              </TableRow>
            )}

            {clients.map((c) => (
              <TableRow key={c.id} className="border-t">
                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      value={editing.name}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                    />
                  ) : (
                    c.name
                  )}
                </TableCell>

                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      value={editing.address}
                      onChange={(e) =>
                        setEditing({ ...editing, address: e.target.value })
                      }
                    />
                  ) : (
                    c.address
                  )}
                </TableCell>

                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      value={editing.postalCode}
                      onChange={(e) =>
                        setEditing({ ...editing, postalCode: e.target.value })
                      }
                    />
                  ) : (
                    c.postalCode
                  )}
                </TableCell>

                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      value={editing.country}
                      onChange={(e) =>
                        setEditing({ ...editing, country: e.target.value })
                      }
                    />
                  ) : (
                    c.country
                  )}
                </TableCell>

                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      type="email"
                      value={editing.email}
                      onChange={(e) =>
                        setEditing({ ...editing, email: e.target.value })
                      }
                    />
                  ) : (
                    c.email
                  )}
                </TableCell>

                <TableCell className="text-center">
                  {editing?.id === c.id ? (
                    <div className="flex justify-center gap-3">
                      <button className="text-green-600" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="text-gray-500"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-[rgb(25,52,85)]"
                        onClick={() => setEditing(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => deleteClient(c.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
