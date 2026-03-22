import type { Shipment } from "../types/Shipment";

export async function fetchShipments(): Promise<Shipment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          orderNumber: "ORD12345",
          trackingId: "TRK-001",
          sender: "Juan Cruz Trucco",
          recipient: "Pedro López",
          status: "Delivered",
          date: new Date().toISOString(),
          type: "Package",
          weigth: "2.3 kg",
          dimensions: "25x20x15 cm",
          declaredValue: "$120",
          senderAdress: "Rafaela, Santa Fe",
          recipientAdress: "Buenos Aires",
          senderPC: "2300",
          recipientPC: "1000",
          senderCountry: "Argentina",
          recipientCountry: "Argentina",
          senderContactNumber: "+54 9 3492 123456",
          recipientContactNumber: "+54 9 11 987654321",
          senderEmail: "juan@example.com",
          recipientEmail: "pedro@example.com",
          service: "Express",
          pickup: "Warehouse",
          delivery: "Home Delivery",
          instructions: "Handle with care",
        },
      ]);
    }, 1000);
  });
}
