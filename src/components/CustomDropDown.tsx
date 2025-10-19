import { useState } from "react";

interface CustomDropdownProps {
  label?: string; // optional label (e.g. "Status")
  options: readonly string[]; // options list
  value: string; // current selected value
  onChange: (value: string) => void; // callback when option selected
  width?: string; // tailwind width class (default w-48)
}

export default function CustomDropdown({
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
        {label ? `${label}: ${value}` : value}
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
