import { Customer } from "@/features/customers/types";

type Props = { data: Customer[] };

export default function CustomersTable({ data }: Props) {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          {/* F15: Header benennen wir im nächsten Schritt korrekt */}
          <tr className="bg-muted/40 text-left border-b">
            <th className="py-2 px-3">Spalte 1</th>
            <th className="py-2 px-3">Spalte 2</th>
            <th className="py-2 px-3">Spalte 3</th>
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) ? (
            <tr>
              <td className="py-6 px-3 text-sm italic text-muted-foreground" colSpan={3}>
                Keine Daten vorhanden
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c.id} className="border-b">
                {/* Reihenfolge passt schon für F15: Kundennummer, Name, Ort */}
                <td className="py-2 px-3">{c.customerNo}</td>
                <td className="py-2 px-3">{c.name}</td>
                <td className="py-2 px-3">{c.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}