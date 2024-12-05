import { permissionObject } from "~/common/const/permission";
import { useAuth } from "~/context/authProvider";
import Error from "~/pages/Error/Error";

const StaffCASHIER = ({ children }: any) => {
  const { user } = useAuth();

  if (
    user?.roleName !== permissionObject.STAFF.CASHIER &&
    user?.roleName !== permissionObject.ADMIN &&
    user?.roleName !== permissionObject.MANAGER
  ) {
    return <Error />;
  }

  return <>{children}</>;
};
export default StaffCASHIER;

export const Staff = ({ children }: any) => {
  const { user } = useAuth();
  if (user?.roleName === permissionObject.CUSTOMER) {
    return <Error />;
  }
  return <>{children}</>;
};
