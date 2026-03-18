import { useState } from "react";
import { useClients } from "@/context/ClientsContext";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

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

  const [editing, setEditing] = useState<Client | null>(null);

  const handleSave = () => {
    if (editing) {
      updateClient(editing);
      setEditing(null);
    }
  };

  return (
    <section className="mb-10 space-y-4">
      <h2 className="text-2xl font-semibold text-[rgb(25,52,85)] dark:text-[#E6EDF5]">
        Clients Directory
      </h2>

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-x-auto dark:border-2 dark:border-slate-200/60">
        <Table>
          <TableHeader>
            <TableRow className="bg-[rgb(25,52,85)] text-white hover:bg-[rgb(25,52,85)] dark:bg-[#DEE6F0] dark:hover:bg-[#DEE6F0]">
              <TableHead className="text-white w-[18%] dark:text-[rgb(25,52,85)]">
                Name
              </TableHead>
              <TableHead className="text-white w-[18%] dark:text-[rgb(25,52,85)]">
                Address
              </TableHead>
              <TableHead className="text-white w-[14%] dark:text-[rgb(25,52,85)]">
                Postal Code
              </TableHead>
              <TableHead className="text-white w-[14%] dark:text-[rgb(25,52,85)]">
                Country
              </TableHead>
              <TableHead className="text-white w-[18%] dark:text-[rgb(25,52,85)]">
                Email
              </TableHead>
              <TableHead className="text-white text-center w-[18%] dark:text-[rgb(25,52,85)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr]:border-border">
            {clients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  No clients registered yet.
                </TableCell>
              </TableRow>
            )}

            {clients.map((c) => (
              <TableRow
                key={c.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell>
                  {editing?.id === c.id ? (
                    <Input
                      value={editing.name}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                      className="bg-background text-foreground border-border"
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
                      className="bg-background text-foreground border-border"
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
                      className="bg-background text-foreground border-border"
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
                      className="bg-background text-foreground border-border"
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
                      className="bg-background text-foreground border-border"
                    />
                  ) : (
                    c.email
                  )}
                </TableCell>

                <TableCell className="text-center">
                  {editing?.id === c.id ? (
                    <div className="flex justify-center gap-3">
                      <Button size="sm" onClick={handleSave}>
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditing(c)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteClient(c.id)}
                      >
                        Delete
                      </Button>
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
