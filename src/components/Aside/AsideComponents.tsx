type Page =
  | "Home"
  | "Register Shipment"
  | "My Shipments"
  | "Clients & Consignees"
  | "Payments"
  | "Analytics & Statistics"
  | "Support"
  | "Settings";

interface AsideComponentProps {
  text: Page;
  isActive: boolean;
  onHandleClick: () => void;
}

export default function AsideComponents({
  text,
  isActive,
  onHandleClick,
}: AsideComponentProps) {
  return (
    <li>
      <button
        onClick={onHandleClick}
        className={`px-4 py-2 w-full text-left rounded transition-colors duration-200 ${
          isActive
            ? "bg-[rgb(25,52,85)] text-white shadow"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {text}
      </button>
    </li>
  );
}
