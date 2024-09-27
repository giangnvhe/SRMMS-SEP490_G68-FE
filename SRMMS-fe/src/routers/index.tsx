import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: "<UserLayout />",
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;
export default Routers;
