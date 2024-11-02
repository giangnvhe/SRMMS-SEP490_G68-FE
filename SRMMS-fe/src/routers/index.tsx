import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRouter";
import { lazy } from "react";
import HomePage from "~/pages/HomePage";

const Login = lazy(() => import("~/pages/Login"));
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const ListEmployee = lazy(() => import("~/pages/Admin/Employees"));
const Logout = lazy(() => import("~/pages/Logout"));
const ListProduct = lazy(() => import("~/pages/Admin/Products"));
const CategoryAdmin = lazy(() => import("~/pages/Admin/Category"));

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <HomePage />,
      path: "/home",
    },
    {
      element: <HomePage />,
      path: "/",
    },
    {
      path: "/logout",
      element: <Logout />,
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
