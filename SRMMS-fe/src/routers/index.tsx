import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRouter";
import ClientLayout from "~/layouts/ClientLayout";
import Chatbot from "~/pages/ChatAi";
import KitchenLayout from "~/layouts/KitchenLayout";
import KitchenOfficer from "~/middleware/Kitchen";
import Kitchen from "~/pages/Kitchen";
import SettingPoint from "~/pages/Admin/SettingPoint";
import StaffCASHIER, { Staff } from "~/middleware/Staff";
import OrderDetailKitchens from "~/pages/Kitchen/components/Details/OrderDetail";

const AdminOfficer = lazy(() => import("~/middleware/Admin"));
const EmployeeLayout = lazy(() => import("~/layouts/EmployeeLayout"));
const OrderDetails = lazy(
  () => import("~/pages/Admin/OrderMana/components/OrderDetail")
);
const VoucherManager = lazy(() => import("~/pages/Admin/Voucher"));
const BookingList = lazy(() => import("~/pages/Admin/BookingList"));
const ContactInfo = lazy(() => import("~/pages/HomePage/ContractInfo"));
const TermsAndConditions = lazy(() => import("~/pages/HomePage/Policy"));
const CombosManager = lazy(() => import("~/pages/Admin/CombosManager"));
const Register = lazy(() => import("~/pages/Register"));
const StaffOfficer = lazy(() => import("~/middleware/Staff"));
const ProfilePage = lazy(() => import("~/pages/Profile"));
const ForgotPassword = lazy(() => import("~/pages/ForgetPassword"));
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
      path: "/",
    },
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
    {
      path: "/profile/:id",
      element: <ProfilePage />,
    },
    {
      path: "/chat-ai",
      element: <Chatbot />,
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
        {
          element: <ContactInfo />,
          path: "/lien-he",
        },
        {
          element: <TermsAndConditions />,
          path: "/term",
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
          element: <ForgotPassword />,
          path: "/forget-password",
        },
        {
          path: "/profile/:id",
          element: <ProfilePage />,
        },
      ],
    },
    //Kitchen
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <KitchenLayout />,
          children: [
            {
              path: "/kitchen",
              element: (
                <KitchenOfficer>
                  <Kitchen />
                </KitchenOfficer>
              ),
            },
            {
              path: "/kitchen/:id",
              element: (
                <KitchenOfficer>
                  <OrderDetailKitchens />
                </KitchenOfficer>
              ),
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
                <StaffCASHIER>
                  <OrderTable />
                </StaffCASHIER>
              ),
            },

            {
              path: "/payment/:id",
              element: (
                <StaffCASHIER>
                  <Payment />
                </StaffCASHIER>
              ),
            },
            {
              path: "/invoice",
              element: (
                <StaffCASHIER>
                  <InvoiceDialog />
                </StaffCASHIER>
              ),
            },
            {
              path: "/tables",
              element: (
                <Staff>
                  <TablesManagement />
                </Staff>
              ),
            },
            {
              path: "/order-list",
              element: (
                <Staff>
                  <OrderManager />
                </Staff>
              ),
            },
            {
              path: "/order/:id",
              element: (
                <Staff>
                  <OrderDetails />
                </Staff>
              ),
            },
            {
              path: "/combos-list",
              element: (
                <Staff>
                  <CombosManager />
                </Staff>
              ),
            },
            {
              path: "/product",
              element: (
                <Staff>
                  <ListProduct />
                </Staff>
              ),
            },
            {
              path: "/category",
              element: (
                <Staff>
                  <CategoryAdmin />
                </Staff>
              ),
            },
            {
              path: "/voucher",
              element: (
                <Staff>
                  <VoucherManager />
                </Staff>
              ),
            },
            {
              path: "/qr-code",
              element: (
                <Staff>
                  <QRCodeScreen />
                </Staff>
              ),
            },
            {
              path: "/booking-list",
              element: (
                <Staff>
                  <BookingList />
                </Staff>
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
              path: "/admin/point",
              element: (
                <AdminOfficer>
                  <SettingPoint />
                </AdminOfficer>
              ),
            },
            {
              path: "/admin/voucher",
              element: (
                <AdminOfficer>
                  <VoucherManager />
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
              path: "/admin/booking-list",
              element: (
                <AdminOfficer>
                  <BookingList />
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
