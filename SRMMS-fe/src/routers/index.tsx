import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRouter";
import { lazy } from "react";
import HomePage from "~/pages/HomePage";
import TablesManagement from "~/pages/Admin/Tables";
import AdminOfficer from "~/middleware/Admin";
import ClientLayout from "~/layouts/ClientLayout";
import MenuInfor from "~/pages/HomePage/MenuInfor";

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
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          element: <HomePage />,
          path: "/home",
        },
        {
          element: <HomePage />,
          path: "/",
        },
        { 
          element: <MenuInfor />,
          path: "/thuc-don",
        },
      ],
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
              element: (
                <AdminOfficer>
                  <Dashboard />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/employees",
              element: (
                <AdminOfficer>
                  <ListEmployee />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/product",
              element: (
                <AdminOfficer>
                  <ListProduct />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/category",
              element: (
                <AdminOfficer>
                  <CategoryAdmin />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/tables",
              element: (
                <AdminOfficer>
                  <TablesManagement />
                </AdminOfficer>
              ),
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
