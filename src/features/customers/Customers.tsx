import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Customer } from "./types";
import { getAllCustomers } from "./api";            // 👈 neu
import CustomersTable from "./table/CustomersTable";

export default function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllCustomers();       // 👈 echte API
        setCustomers(data);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Fehler beim Laden der Kunden."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="Nach Name filtern…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="border rounded px-3 py-1"
          onClick={() => navigate("/kunden/neu")}
        >
          Neuer Kunde
        </button>
      </div>

      {loading && <p>Lade Kunden…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <CustomersTable data={filtered} />
      )}
    </div>
  );
}
