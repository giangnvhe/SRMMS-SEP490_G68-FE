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
