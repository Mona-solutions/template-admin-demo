export const SHIPMENT_STATUSES = [
  "All",
  "In Transit",
  "Delivered",
  "Pending",
  "Failed",
] as const;

export const SHIPMENT_STATUSES_FOR_FORM = SHIPMENT_STATUSES.filter(
  (s) => s !== "All"
);

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const SHIPMENT_TYPE = [
  "Package",
  "Envelope",
  "Pallet",
  "Documents",
] as const;
export type ShipmentType = (typeof SHIPMENT_TYPE)[number];

export const SHIPMENT_SERVICE = [
  "Standard",
  "Express",
  "Same-Day",
  "Next-Day",
] as const;
export type ShipmentService = (typeof SHIPMENT_SERVICE)[number];

export const SHIPMENT_PICKUP_LOCATION = [
  "Warehouse",
  "Store",
  "Client’s Address",
] as const;
export type ShipmentPickLocation = (typeof SHIPMENT_PICKUP_LOCATION)[number];

export const SHIPMENT_DELIVERY_LOCATION = [
  "Home Delivery",
  "Pickup Point",
  "Office",
] as const;
export type ShipmentDeliveryLocation =
  (typeof SHIPMENT_DELIVERY_LOCATION)[number];

export type ShipmentFormData = {
  orderNumber: string;
  trackingId: string;
  sender: string;
  recipient: string;
  status: ShipmentStatus;
  type: ShipmentType;
  service: ShipmentService;
  pickup: ShipmentPickLocation;
  delivery: ShipmentDeliveryLocation;
  date: Date | null;
};

export interface Shipment {
  id: string;
  orderNumber: string;
  trackingId: string;
  status: ShipmentStatus;
  date: string;
  type: ShipmentType;
  weigth: string;
  dimensions: string;
  declaredValue: string;
  service: ShipmentService;
  pickup: ShipmentPickLocation;
  delivery: ShipmentDeliveryLocation;
  instructions: string;

  // Sender information
  sender: string;
  senderAdress: string;
  senderPC: string;
  senderCountry: string;
  senderContactNumber: string;
  senderEmail: string;

  // Recipient information
  recipient: string;
  recipientAdress: string;
  recipientPC: string;
  recipientCountry: string;
  recipientContactNumber: string;
  recipientEmail: string;
}
