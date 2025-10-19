import { useState } from "react";
import type {
  Shipment,
  ShipmentDeliveryLocation,
  ShipmentPickLocation,
  ShipmentService,
  ShipmentStatus,
  ShipmentType,
} from "../../types/Shipment";
import {
  SHIPMENT_DELIVERY_LOCATION,
  SHIPMENT_STATUSES,
  SHIPMENT_TYPE,
  SHIPMENT_SERVICE,
  SHIPMENT_PICKUP_LOCATION,
} from "../../types/Shipment";

function generateTrackingId(): string {
  const prefix = "DRP"; // puede ser tu marca (Droppit)
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 8 dígitos
  const countryCode = "AR"; // o el país de origen, si querés
  return `${prefix}-${randomNumber}-${countryCode}`;
}

interface RegisterShipmentProps {
  onCreate: (newShipment: Shipment) => void;
}

export default function RegisterShipment({ onCreate }: RegisterShipmentProps) {
  const inputClassName =
    "border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(25,52,85)]";
  const categoryHeader =
    "bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md mb-6";

  // --- States ---
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingId, setTrackingId] = useState(generateTrackingId());
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState<ShipmentStatus>("Pending");
  const [date, setDate] = useState("");
  const [type, setType] = useState<ShipmentType>("Package");
  const [weigth, setWeigth] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [senderAdress, setSenderAdress] = useState("");
  const [recipientAdress, setRecipientAdress] = useState("");
  const [senderPC, setSenderPC] = useState("");
  const [recipientPC, setRecipientPC] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("");
  const [senderContactNumber, setSenderContactNumber] = useState("");
  const [recipientContactNumber, setRecipientContactNumber] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [service, setService] = useState<ShipmentService>("Standard");
  const [pickup, setPickup] = useState<ShipmentPickLocation>("Warehouse");
  const [delivery, setDelivery] =
    useState<ShipmentDeliveryLocation>("Home Delivery");
  const [instructions, setInstructions] = useState("");

  // --- Sumbit Button ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setTrackingId(generateTrackingId());

    setTimeout(() => {
      const newShipment: Shipment = {
        id: Date.now().toString(),
        orderNumber,
        trackingId,
        sender,
        recipient,
        status,
        date: new Date().toISOString(),
        type,
        weigth,
        dimensions,
        declaredValue,
        senderAdress,
        recipientAdress,
        senderPC,
        recipientPC,
        senderCountry,
        recipientCountry,
        senderContactNumber,
        recipientContactNumber,
        senderEmail,
        recipientEmail,
        service,
        pickup,
        delivery,
        instructions,
      };

      onCreate(newShipment);

      // limpiar formulario
      setOrderNumber("");
      setTrackingId("");
      setSender("");
      setRecipient("");
      setStatus("Pending");
      setType("Package");
      setWeigth("");
      setDimensions("");
      setDeclaredValue("");
      setSenderAdress("");
      setRecipientAdress("");
      setSenderPC("");
      setRecipientPC("");
      setSenderCountry("");
      setRecipientCountry("");
      setSenderContactNumber("");
      setRecipientContactNumber("");
      setSenderEmail("");
      setRecipientEmail("");
      setService("Standard");
      setPickup("Warehouse");
      setDelivery("Home Delivery");
      setInstructions("");

      setIsSubmitting(false);
      setSuccessMessage("Shipment successfully registered!");
    }, 1200);
  };

  return (
    <div className="py-6 px-8 bg-gray-50 min-h-screen">
      <div className={categoryHeader}>
        <h1 className="text-2xl font-bold">Register Shipment</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-lg font-semibold mb-2">Shipment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Tracking ID"
            value={trackingId}
            readOnly
            onChange={(e) => setTrackingId(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClassName}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ShipmentType)}
            className={inputClassName}
          >
            {SHIPMENT_TYPE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Weight"
            value={weigth}
            onChange={(e) => setWeigth(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Dimensions"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Declared Value"
            value={declaredValue}
            onChange={(e) => setDeclaredValue(e.target.value)}
            className={inputClassName}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
            className={inputClassName}
          >
            {SHIPMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* ========================= */}
        {/* 👤 Sender */}
        {/* ========================= */}
        <h2 className="text-lg font-semibold mb-2">Sender</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Address"
            value={senderAdress}
            onChange={(e) => setSenderAdress(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={senderPC}
            onChange={(e) => setSenderPC(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Country"
            value={senderCountry}
            onChange={(e) => setSenderCountry(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={senderContactNumber}
            onChange={(e) => setSenderContactNumber(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className={inputClassName}
          />
        </div>

        {/* ========================= */}
        {/* 📬 Recipient */}
        {/* ========================= */}
        <h2 className="text-lg font-semibold mb-2">Recipient</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Address"
            value={recipientAdress}
            onChange={(e) => setRecipientAdress(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={recipientPC}
            onChange={(e) => setRecipientPC(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Country"
            value={recipientCountry}
            onChange={(e) => setRecipientCountry(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={recipientContactNumber}
            onChange={(e) => setRecipientContactNumber(e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className={inputClassName}
          />
        </div>

        {/* ========================= */}
        {/* 🚚 Transport */}
        {/* ========================= */}
        <h2 className="text-lg font-semibold mb-2">Transport</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={service}
            onChange={(e) => setService(e.target.value as ShipmentService)}
            className={inputClassName}
          >
            {SHIPMENT_SERVICE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value as ShipmentPickLocation)}
            className={inputClassName}
          >
            {SHIPMENT_PICKUP_LOCATION.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={delivery}
            onChange={(e) =>
              setDelivery(e.target.value as ShipmentDeliveryLocation)
            }
            className={inputClassName}
          >
            {SHIPMENT_DELIVERY_LOCATION.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Delivery Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={`${inputClassName} col-span-3 resize-none`}
          />
        </div>

        {/* ========================= */}
        {/* ✅ Submit */}
        {/* ========================= */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[rgb(25,52,85)] text-white px-6 py-3 rounded shadow hover:bg-[rgb(32,76,130)] transition-all"
          >
            {isSubmitting ? "Processing.." : "Create Shipment"}
          </button>

          {successMessage && (
            <p className="text-green-600 mt-3 font-medium text-right animate-fade-in">
              ✅ {successMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
