export interface Person {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  country: string;
  contactNumber: string;
  email: string;
  type: "Client" | "Consignee";
}
