import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: "<UserLayout />",
      children: [],
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
