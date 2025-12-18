export const PAYMENT_STATUSES = [
  "Paid",
  "Pending",
  "Failed",
  "Refunded",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_METHODS = [
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "PayPal",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Payment {
  invoice: string;
  client: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  issuedAt: string;
  dueAt: string;
}
