import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "~/components/Spiner";

const EmployeeLayout = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default EmployeeLayout;
