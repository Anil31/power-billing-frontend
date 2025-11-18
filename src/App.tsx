import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import CustomerDetails from "@/pages/CustomerDetails";


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <AppShell />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/kunden", element: <Customers /> },
      { path: "/customers", element: <Customers /> }, // kompatibel für Altpfade
      { path: "/kunden/:id", element: <CustomerDetails /> }, // 🔹 neu: Detailseite
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
