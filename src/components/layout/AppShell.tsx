import { Link, NavLink, Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

/** Rahmenlayout mit Header, Content und Footer.
 * <Outlet /> rendert die jeweilige Unterseite (Dashboard/Customers).
 */
export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-background">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="text-xl font-semibold">
            ⚡ Power Billing
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-medium" : ""}`
              }
            >
              Kunden
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      <Separator />
      <footer className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Power Billing
      </footer>
    </div>
  );
}
