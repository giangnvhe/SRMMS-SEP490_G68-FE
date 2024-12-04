import { permissionObject } from "~/common/const/permission";
import { useAuth } from "~/context/authProvider";
import Error from "~/pages/Error/Error";

const KitchenOfficer = ({ children }: any) => {
  const { user } = useAuth();
  if (
    user?.roleName !== permissionObject.ADMIN &&
    user?.roleName !== permissionObject.KITCHEN
  ) {
    return <Error />;
  }

  return <>{children}</>;
};
export default KitchenOfficer;
