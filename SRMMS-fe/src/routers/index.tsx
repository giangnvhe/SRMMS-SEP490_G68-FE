import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <AdminLayout />,
      path: "/admin",
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
