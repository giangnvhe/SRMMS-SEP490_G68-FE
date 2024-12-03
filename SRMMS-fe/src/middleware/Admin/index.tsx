import { permissionObject } from "~/common/const/permission";
import { useAuth } from "~/context/authProvider";
import Error from "~/pages/Error/Error";

const AdminOfficer = ({ children }: any) => {
  const { user } = useAuth();
  if (user?.roleName !== permissionObject.ADMIN  && user?.roleName !== permissionObject.MANAGER) {
    return <Error />;
  }

  return <>{children}</>;
};
export default AdminOfficer;
