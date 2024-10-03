import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
