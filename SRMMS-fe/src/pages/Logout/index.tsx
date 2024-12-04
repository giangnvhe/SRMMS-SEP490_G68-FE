import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import useNotification from "~/hooks/useNotification";

const Logout = () => {
  const navigate = useNavigate();
  const { removeToken } = useAuth();
  const { successMessage } = useNotification();
  useEffect(() => {
    removeToken();
    successMessage({
      title: "Đăng Xuất",
      description: "Bạn đã đăng xuất thành công.",
    });
    navigate("/home");
  }, []);
  return <div>Logout page</div>;
};

export default Logout;
