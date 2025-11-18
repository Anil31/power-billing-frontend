export type CustomerId = string;

export interface Customer {
  id: CustomerId;
  customerNo: string;
  name: string;
  city: string;
  address: string; // 🔹 neu
  email: string;   // 🔹 neu
}

export interface CustomerUsage {
  id: string;
  customerId: string;
  date: string; // ISO-String "2024-01-01"
  kwh: number;
}