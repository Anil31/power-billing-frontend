import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <AppShell />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/customers", element: <Customers /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
