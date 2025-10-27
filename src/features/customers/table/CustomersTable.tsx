type Props = {
  data: unknown[]; // wird in F14/F15 typisiert
};

export default function CustomersTable({ data }: Props) {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          {/* Header nur vorbereitet – Spalten benennen wir erst in F15 */}
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
          ) : null /* F14: hier füllen wir dann Zeilen */}
        </tbody>
      </table>
    </div>
  );
}