import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { permissionObject } from "~/common/const/permission";
import { useAuth } from "~/context/authProvider";
import Error from "~/pages/Error/Error";

const StaffOfficer = ({ children }: any) => {
  const { user } = useAuth();

  if (
    user?.roleName !== permissionObject.STAFF.CASHIER &&
    user?.roleName !== permissionObject.ADMIN
  ) {
    return <Error />;
  }

  return <>{children}</>;
};
export default StaffOfficer;

export const AdminRouter = ({ children }: any) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (
      user?.roleName !== permissionObject.STAFF.CASHIER &&
      user?.roleName !== permissionObject.ADMIN
    ) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export const Staff = ({ children }: any) => {
  const { user } = useAuth();
  if (
    user?.roleName !== permissionObject.STAFF.CASHIER &&
    user?.roleName !== permissionObject.STAFF.SERVICE_STAFF
  ) {
    return <Error />;
  }

  return <>{children}</>;
};
