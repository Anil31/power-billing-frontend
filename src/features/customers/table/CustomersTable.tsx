import { useNavigate } from "react-router-dom";
import { Customer } from "@/features/customers/types";

type Props = { data: Customer[] };

export default function CustomersTable({ data }: Props) {
  const empty = data.length === 0;
  const nav = useNavigate(); // 🔹 neu

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/40 text-left border-b">
            <th className="py-2 px-3">Kundennummer</th>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Ort</th>
          </tr>
        </thead>

        <tbody>
          {empty ? (
            <tr>
              <td
                colSpan={3}
                className="py-6 px-3 text-sm italic text-muted-foreground"
              >
                Keine Daten vorhanden
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr
                key={c.id}
                className="border-b cursor-pointer hover:bg-muted/40" // 🔹 optische Rückmeldung
                onClick={() => nav(`/kunden/${c.id}`)}                  // 🔹 Navigation
              >
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
