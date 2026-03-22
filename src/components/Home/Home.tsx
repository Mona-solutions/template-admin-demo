import { useState } from "react";
import { useShipments } from "@/context/ShipmentsContext";

import GreetingUser from "./GreetingUser";
import RecentActivity from "./RecentActivity";
import ShipmentData from "./ShipmentData";
import UserTab from "./UserTab";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const { shipments } = useShipments();

  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("USA");

  return (
    <div>
      <header className="flex justify-between items-center rounded-lg px-6 py-4 border-b-2 w-full dark:border border-border">
        <div className="flex gap-2">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">🇺🇸 United States</SelectItem>
              <SelectItem value="BRA">🇧🇷 Brazil</SelectItem>
              <SelectItem value="ARG">🇦🇷 Argentina</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD $</SelectItem>
              <SelectItem value="BRL">BRL R$</SelectItem>
              <SelectItem value="ARS">ARS $</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <UserTab />
        </div>
      </header>

      <main className="py-4">
        <div>
          <GreetingUser/>
        </div>
        <div className="mt-10 dark:border rounded-lg">
        <ShipmentData shipments={shipments} />
        </div>
        <div className="mt-10 dark:border rounded-lg">
        <RecentActivity shipments={shipments} />
        </div>
      </main>
    </div>
  );
}
