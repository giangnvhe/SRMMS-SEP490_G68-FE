import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ListEmployee from "../pages/Admin/Employees";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <AdminLayout />,
      path: "/admin",
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/employees",
          element: <ListEmployee />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
