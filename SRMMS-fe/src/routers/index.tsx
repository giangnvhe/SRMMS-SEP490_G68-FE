import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ListEmployee from "../pages/Admin/Employees";
import AddEmployee from "../pages/Admin/Employees/AddEmployee";
import UpdateEmployee from "../pages/Admin/Employees/UpdateEmployee";
import { ProtectedRoute } from "./ProtectedRouter";
import Logout from "../pages/Logout";
import ListProduct from "~/pages/Admin/Products";
import CategoryAdmin from "~/pages/Admin/Category";
import AddOrEditProduct from "~/pages/Admin/Products/AddOrEditProduct";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
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
            {
              path: "/admin/add-employee",
              element: <AddEmployee />,
            },
            {
              path: "/admin/update-employee/:id",
              element: <UpdateEmployee />,
            },
            {
              path: "/admin/products",
              element: <ListProduct />,
            },
            {
              path: "/admin/category",
              element: <CategoryAdmin />,
            },
            {
              path: "/admin/add-product",
              element: <AddOrEditProduct />,
            },
            {
              path: "/admin/update-product/:id",
              element: <AddOrEditProduct />,
            },
            {
              path: "/admin/logout",
              element: <Logout />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
