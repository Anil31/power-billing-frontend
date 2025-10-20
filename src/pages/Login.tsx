import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !pw) return;
    nav("/dashboard");
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm p-6">
        <h1 className="text-lg font-semibold mb-4">Anmeldung</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">E-Mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm">Passwort</label>
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Card>
    </div>
  );
}
