// src/features/customers/api.ts
import { apiFetch } from "@/lib/apiClient";
import type { Customer } from "./types"; // dein bestehender Typ

// So könnte ein Datensatz aus dem Backend aussehen
export type ApiCustomer = {
  id: number;
  vorname: string;
  nachname: string;
  adresse: string;
  telefon: string;
  email: string;
  // ggf. weitere Felder je nach Backend
};

// Mapping: Backend → Frontend-Model
function mapApiCustomerToCustomer(api: ApiCustomer): Customer {
  return {
    id: String(api.id), 
    customerNo: api.id.toString(), // oder eigenes Feld, wenn vorhanden
    name: `${api.vorname} ${api.nachname}`,
    city: "", // kann später aus adresse geparsed oder ergänzt werden
    address: api.adresse,
    email: api.email,
    // ggf. weitere Felder
  };
}

function mapCustomerToApi(customer: Customer): Partial<ApiCustomer> {
  // Evtl. Name in Vor- und Nachname splitten (vereinfachte Variante)
  const [vorname, ...rest] = customer.name.split(" ");
  const nachname = rest.join(" ");

  return {
    vorname,
    nachname,
    adresse: customer.address,
    email: customer.email,
    // telefon fehlt in deinem Customer-Typ noch → später ergänzen
  };
}

export async function getAllCustomers(): Promise<Customer[]> {
  const apiCustomers = await apiFetch<ApiCustomer[]>("/api/kunden", {
    method: "GET",
    auth: true,
  });

  return apiCustomers.map(mapApiCustomerToCustomer);
}

export async function getCustomerById(id: string): Promise<Customer> {
  const apiCustomer = await apiFetch<ApiCustomer>(`/api/kunden/${id}`, {
    method: "GET",
    auth: true,
  });

  return mapApiCustomerToCustomer(apiCustomer);
}


export type CreateCustomerPayload = Omit<Customer, "id">;

export async function createCustomer(payload: CreateCustomerPayload): Promise<Customer> {
  const apiPayload = mapCustomerToApi(payload as Customer);

  const created = await apiFetch<ApiCustomer>("/api/kunden", {
    method: "POST",
    body: apiPayload,
    auth: true,
  });

  return mapApiCustomerToCustomer(created);
}

export async function updateCustomer(id: number, payload: Partial<Customer>): Promise<Customer> {
  const apiPayload = mapCustomerToApi(payload as Customer);

  const updated = await apiFetch<ApiCustomer>(`/api/kunden/${id}`, {
    method: "PUT",
    body: apiPayload,
    auth: true,
  });

  return mapApiCustomerToCustomer(updated);
}
