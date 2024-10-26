import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRouter";
import { lazy } from "react";

const Login = lazy(() => import("~/pages/Login"));
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const ListEmployee = lazy(() => import("~/pages/Admin/Employees"));
const AddEmployee = lazy(() => import("~/pages/Admin/Employees/AddAccount"));
const UpdateEmployee = lazy(
  () => import("~/pages/Admin/Employees/UpdateEmployee")
);
const Logout = lazy(() => import("~/pages/Logout"));
const ListProduct = lazy(() => import("~/pages/Admin/Products"));
const CategoryAdmin = lazy(() => import("~/pages/Admin/Category"));

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
              path: "/admin/product",
              element: <ListProduct />,
            },
            {
              path: "/admin/category",
              element: <CategoryAdmin />,
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
