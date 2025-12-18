import type { Page } from "../../types/Page";

interface AsideProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const menuItems: { page: Page; label: string }[] = [
  { page: "Home", label: "Home" },
  { page: "My Shipments", label: "My Shipments" },
  { page: "ClientsAndConsignees", label: "Clients & Consignees" },
  { page: "Payments", label: "Payments" },
  { page: "AnalyticsAndStatistics", label: "Analytics & Statistics" },
  { page: "Support", label: "Support" },
  { page: "Settings", label: "Settings" },
];

export default function Aside({ activePage, onNavigate }: AsideProps) {
  return (
    <aside className="w-72 pt-4 rounded-r-lg shadow-xl border-r-stone-200">
      <div className="flex items-center border-b-2 border-stone-100 gap-2 justify-center pb-4 mb-6">
        <img className="h-14 w-17" src="/DroppitLogo.png" alt="droppit logo" />
        <h1 className="text-2xl font-medium text-center text-[rgb(25,52,85)]">
          Droppit
        </h1>
      </div>

      <ul className="flex flex-col gap-2 px-4">
        {menuItems.map(({ page, label }) => (
          <li key={page}>
            <button
              className={`px-4 py-2 w-full text-left rounded 
                ${
                  activePage === page
                    ? "bg-[rgb(25,52,85)] text-white"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
