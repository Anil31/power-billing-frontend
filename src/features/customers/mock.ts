import { Customer, CustomerUsage } from "./types";

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    customerNo: "10001",
    name: "Müller GmbH",
    city: "Köln",
    address: "Musterstraße 1, 50667 Köln",
    email: "info@mueller-gmbh.de",
  },
  {
    id: "c2",
    customerNo: "10002",
    name: "Schneider AG",
    city: "Bonn",
    address: "Hauptstraße 5, 53111 Bonn",
    email: "kontakt@schneider-ag.de",
  },
  {
    id: "c3",
    customerNo: "10003",
    name: "Kaiser OHG",
    city: "Leverkusen",
    address: "Industriestraße 10, 51373 Leverkusen",
    email: "service@kaiser-ohg.de",
  },
];

export const mockUsage: CustomerUsage[] = [
  // c1
  { id: "u1", customerId: "c1", date: "2024-01-01", kwh: 120 },
  { id: "u2", customerId: "c1", date: "2024-02-01", kwh: 135 },
  { id: "u3", customerId: "c1", date: "2024-03-01", kwh: 150 },
  { id: "u4", customerId: "c1", date: "2024-04-01", kwh: 142 },

  // c2
  { id: "u5", customerId: "c2", date: "2024-01-15", kwh: 80 },
  { id: "u6", customerId: "c2", date: "2024-02-15", kwh: 95 },
  { id: "u7", customerId: "c2", date: "2024-03-15", kwh: 100 },

  // c3 – bewusst weniger Daten
  { id: "u8", customerId: "c3", date: "2024-03-10", kwh: 60 },
];
