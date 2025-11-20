import { apiFetch } from "@/lib/apiClient";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
};

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const data = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: req,
    auth: false, // Beim Login noch kein Token
  });

  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
}
