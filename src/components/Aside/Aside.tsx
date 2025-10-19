import type { Page } from "../../types/Page";

interface AsideProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export default function Aside({ activePage, onNavigate }: AsideProps) {
  const menuItems: Page[] = [
    "Home",
    "Register Shipment",
    "My Shipments",
    "Clients & Consignees",
    "Payments",
    "Analytics & Statistics",
    "Support",
    "Settings",
  ];

  return (
    <aside className="w-[20rem] pt-4 md:w-72 rounded-r-lg shadow-xl border-r-stone-200">
      <div className="flex items-center border-b-2 border-stone-100 gap-2 justify-center pb-4 mb-6">
        <img
          className="h-14 w-17"
          src="./public/Droppitlogo.png"
          alt="droppit logo"
        />
        <h1 className="text-2xl font-medium text-center text-[rgb(25,52,85)]">
          Droppit
        </h1>
      </div>

      <ul className="flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <li key={item}>
            <button
              className={`px-4 py-2 w-full text-left rounded 
                ${
                  activePage === item
                    ? "bg-[rgb(25,52,85)] text-white"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => onNavigate(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
