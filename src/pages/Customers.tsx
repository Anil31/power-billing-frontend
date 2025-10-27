import CustomersTable from "@/features/customers/table/CustomersTable";
import { mockCustomers } from "@/features/customers/mock";

export default function Customers() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Kunden</h1>
        <p className="text-sm text-muted-foreground">Hier entsteht die Kundenliste.</p>
      </div>

      <CustomersTable data={mockCustomers} />
    </div>
  );
}