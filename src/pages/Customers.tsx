import CustomersTable from "@/features/customers/table/CustomersTable";

export default function Customers() {
  const data: unknown[] = []; // F14: hier kommen 3 Mockkunden rein

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Kunden</h1>
        <p className="text-sm text-muted-foreground">Hier entsteht die Kundenliste.</p>
      </div>

      <CustomersTable data={data} />
    </div>
  );
}