import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRouter";
import ClientLayout from "~/layouts/ClientLayout";
import Register from "~/pages/Register";
import OrderDetails from "~/pages/Admin/OrderMana/components/OrderDetail";
import CombosManager from "~/pages/Admin/CombosManager";
import { AdminRouter } from "~/middleware/Staff";

const AdminOfficer = lazy(() => import("~/middleware/Admin"));
const EmployeeLayout = lazy(() => import("~/layouts/EmployeeLayout"));
const StaffOfficer = lazy(() => import("~/middleware/Staff"));
const InvoiceDialog = lazy(() => import("~/pages/Invoice"));
const Login = lazy(() => import("~/pages/Login"));
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const PublicLayout = lazy(() => import("~/layouts/PublicLayout"));
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
const OrderManager = lazy(() => import("~/pages/Admin/OrderMana"));

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
    {
      path: "/register",
      element: <Register />,
    },

    //Public Layout
    {
      path: "/",
      element: <PublicLayout />,
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

    //Client Layout

    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          element: <MenuClient />,
          path: "/menu-client/:id",
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              element: (
                <StaffOfficer>
                  <InvoiceDialog />
                </StaffOfficer>
              ),
              path: "/invoice",
            },
          ],
        },
      ],
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
          element: (
            <AdminRouter>
              <AdminLayout />
            </AdminRouter>
          ),
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
              path: "/admin/combos-list",
              element: (
                <AdminOfficer>
                  <CombosManager />
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
              path: "/admin/order-list",
              element: (
                <AdminOfficer>
                  <OrderManager />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/order/:id",
              element: (
                <AdminOfficer>
                  <OrderDetails />
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
