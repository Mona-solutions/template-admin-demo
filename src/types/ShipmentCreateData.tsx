import type {
  ShipmentStatus,
  ShipmentType,
  ShipmentService,
  ShipmentPickLocation,
  ShipmentDeliveryLocation,
} from "./Shipment";

export interface ShipmentCreateData {
  orderNumber: string;
  trackingId: string;
  status: ShipmentStatus;
  date: string;
  type: ShipmentType;
  service: ShipmentService;
  pickup: ShipmentPickLocation;
  delivery: ShipmentDeliveryLocation;

  sender: string;
  senderEmail: string;

  recipient: string;
  recipientEmail: string;
}
