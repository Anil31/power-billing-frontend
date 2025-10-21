// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [touched, setTouched] = useState({ email: false, pw: false });

  const emailEmpty = touched.email && email.trim() === "";
  const pwEmpty = touched.pw && pw.trim() === "";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // bei Submit beide Felder als "berührt" markieren
    setTouched({ email: true, pw: true });

    const hasError = email.trim() === "" || pw.trim() === "";
    if (hasError) return; // kein Seitenwechsel bei Fehlern

    nav("/dashboard");
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm p-6">
        <h1 className="text-lg font-semibold mb-4">Anmeldung</h1>

        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <div>
            <label className="text-sm">E-Mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@example.com"
              aria-invalid={emailEmpty ? "true" : "false"}
            />
            {emailEmpty && (
              <p className="text-sm mt-1 text-red-600">E-Mail darf nicht leer sein.</p>
            )}
          </div>

          <div>
            <label className="text-sm">Passwort</label>
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
              placeholder="••••••••"
              aria-invalid={pwEmpty ? "true" : "false"}
            />
            {pwEmpty && (
              <p className="text-sm mt-1 text-red-600">Passwort darf nicht leer sein.</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            // optional: Button deaktivieren, solange leer
            disabled={email.trim() === "" || pw.trim() === ""}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
