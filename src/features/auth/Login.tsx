import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });  // 👈 API Call
      navigate("/dashboard");            // 👈 nach Login weiter
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Login fehlgeschlagen."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 space-y-4 border rounded p-4"
    >
      <h1 className="text-xl font-semibold text-center">Login</h1>

      <div className="space-y-1">
        <label className="block text-sm">E-Mail</label>
        <input
          type="email"
          className="border rounded px-2 py-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">Passwort</label>
        <input
          type="password"
          className="border rounded px-2 py-1 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full border rounded px-3 py-2"
        disabled={loading}
      >
        {loading ? "Anmeldung…" : "Login"}
      </button>
    </form>
  );
}
