import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminOfficer from "~/middleware/Admin";
import { ProtectedRoute } from "./ProtectedRouter";
import EmployeeLayout from "~/layouts/EmployeeLayout";
import StaffOfficer from "~/middleware/Staff";

const Login = lazy(() => import("~/pages/Login"));
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const ClientLayout = lazy(() => import("~/layouts/ClientLayout"));
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const ListEmployee = lazy(() => import("~/pages/Admin/Employees"));
const Logout = lazy(() => import("~/pages/Logout"));
const ListProduct = lazy(() => import("~/pages/Admin/Products"));
const CategoryAdmin = lazy(() => import("~/pages/Admin/Category"));
const HomePage = lazy(() => import("~/pages/HomePage"));
const MenuInfor = lazy(() => import("~/pages/HomePage/MenuInfor"));
const MenuClient = lazy(() => import("~/pages/Client/MenuClient"));
const TablesManagement = lazy(() => import("~/pages/Admin/Tables"));
const BookingTable = lazy(() => import("~/pages/Client/BookingTable"));
const OrderTable = lazy(() => import("~/pages/Staff/OrderTable"));
const QRCodeScreen = lazy(
  () => import("~/pages/Admin/Tables/components/QRCode")
);
const Payment = lazy(() => import("~/pages/Staff/Payment"));
const ProductDetail = lazy(
  () => import("~/pages/HomePage/components/ProductDetail")
);

const RouterComponent = () => {
  const router = createBrowserRouter([
    //Free layouts
    {
      element: <Login />,
      path: "/login",
    },
    {
      path: "/logout",
      element: <Logout />,
    },

    //client Layout
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
        {
          element: <BookingTable />,
          path: "/dat-ban",
        },
        {
          element: <ProductDetail />,
          path: "/product/:id",
        },
      ],
    },

    // menuLayout
    {
      element: <MenuClient />,
      path: "/menu-client/:id",
    },
    //Staff layout
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <EmployeeLayout />,
          children: [
            {
              path: "/order-table",
              element: (
                <StaffOfficer>
                  <OrderTable />
                </StaffOfficer>
              ),
            },
            {
              path: "/payment/:id",
              element: (
                <StaffOfficer>
                  <Payment />
                </StaffOfficer>
              ),
            },
          ],
        },
      ],
    },

    // admin layout
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <AdminLayout />,
          path: "/",
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
            {
              path: "/qr-code",
              element: (
                <StaffOfficer>
                  <QRCodeScreen />
                </StaffOfficer>
              ),
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
