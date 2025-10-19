import { useState } from "react";
import GrettingUser from "./GrettingUser";
import NotificationTab from "./NotificationTab";
import RecentActivity from "./RecentActivity";
import ShipmentData from "./ShipmentData";
import UserTab from "./UserTab";
import type { User } from "../../types/UserData";

// ---- CustomDropdown copied inline (or you can import if modularized) ----
interface CustomDropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

interface HomeProps {
  user: User;
}

function CustomDropdown({
  label,
  options,
  value,
  onChange,
  width = "w-48",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`p-3 border rounded bg-white ${width} flex justify-between items-center`}
      >
        <div className="flex gap-1 items-center">
          {label && <span className="font-medium">{label}:</span>}
          <span>{value}</span>
        </div>
        <svg
          className="w-4 h-4 ml-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute mt-1 ${width} bg-white border rounded shadow-lg z-10`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[rgb(25,52,85)] hover:text-white cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---- Main Home component ----
export default function Home({ user }: HomeProps) {
  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("USA");

  return (
    <div>
      <header className="flex justify-between items-center px-8 py-6 border-b-2 w-full">
        <div className="flex gap-4">
          <CustomDropdown
            label="Currency"
            options={["USD", "EUR", "GBP", "ARS"]}
            value={currency}
            onChange={setCurrency}
            width="w-32"
          />
          <CustomDropdown
            label="Country"
            options={["USA", "Argentina", "Spain", "Brazil"]}
            value={country}
            onChange={setCountry}
            width="w-40"
          />
        </div>
        <div className="flex gap-4">
          <NotificationTab />
          <UserTab name={user.name} email={user.email} />
        </div>
      </header>

      <main className="px-8 py-4">
        <GrettingUser name={user.name} />
        <ShipmentData />
        <RecentActivity />
      </main>
    </div>
  );
}
