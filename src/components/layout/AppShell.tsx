import { NavLink, Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="font-semibold">Power Billing</div>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "px-2 py-1 rounded-md outline-none focus:ring " +
                  (isActive ? "font-medium underline" : "hover:underline")
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kunden"
                className={({ isActive }) =>
                  "px-2 py-1 rounded-md outline-none focus:ring " +
                  (isActive ? "font-medium underline" : "hover:underline")
                }
              >
                Kunden
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 h-12 flex items-center">
          © {new Date().getFullYear()} Power Billing
        </div>
      </footer>
    </div>
  );
}
