import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import CustomersTable from "@/features/customers/table/CustomersTable";
import { mockCustomers } from "@/features/customers/mock";

export default function Customers() {
  const [q, setQ] = useState("");

  // Case-insensitive Filter nach Name; leere Suche zeigt alle
  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return mockCustomers;
    return mockCustomers.filter((c) => c.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Kunden</h1>
        <p className="text-sm text-muted-foreground">Hier entsteht die Kundenliste.</p>
      </div>

      <div className="max-w-sm">
        <label className="text-sm mb-1 block">Suche</label>
        <Input
          placeholder="Name enthält …"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Kundennamen filtern"
        />
      </div>

      <CustomersTable data={data} />
      {data.length === 0 && (
        <p className="text-sm italic text-muted-foreground">Keine Treffer.</p>
      )}
    </div>
  );
}