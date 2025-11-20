// src/lib/apiClient.ts
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"; // ggf. anpassen

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type FetchOptions = {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean; // ob Bearer Token gesetzt werden soll
};

export async function apiFetch<TResponse>(
  path: string,
  { method = "GET", body, auth = true }: FetchOptions = {}
): Promise<TResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Optional: Health- und Auth-Fehler abfangen
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let message = `Request failed with status ${res.status}`;
    if (text) {
      try {
        const json = JSON.parse(text);
        message = json.message || json.error || message;
      } catch {
        message = text || message;
      }
    }
    throw new Error(message);
  }

  // 204 No Content z.B. bei DELETE
  if (res.status === 204) {
    return undefined as TResponse;
  }

  return (await res.json()) as TResponse;
}
