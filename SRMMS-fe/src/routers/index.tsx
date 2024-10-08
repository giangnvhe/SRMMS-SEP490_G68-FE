import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ListEmployee from "../pages/Admin/Employees";
import AddEmployee from "../pages/Admin/Employees/AddEmployee";
import UpdateEmployee from "../pages/Admin/Employees/UpdateEmployee";

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
        {
          path: "/admin/addEmployee",
          element: <AddEmployee />,
        },
        {
          path: "/admin/updateEmployee/:id",
          element: <UpdateEmployee />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
