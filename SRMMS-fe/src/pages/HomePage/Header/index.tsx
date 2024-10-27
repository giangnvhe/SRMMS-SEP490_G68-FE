import TabComponent from "~/components/TabsComponent";
import logo from "~/assets/images/logo-home.png";
import ButtonComponent from "~/components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { useAuth } from "~/context/authProvider";
import { LuLogOut } from "react-icons/lu";
import useNotification from "~/hooks/useNotification";

const items = [
  { key: "1", label: "Trang chủ" },
  { key: "2", label: "Về chúng tôi" },
  { key: "3", label: "Tin tức" },
  { key: "4", label: "Liên hệ" },
];

const Header = () => {
  const navigate = useNavigate();
  const { token, user, removeToken } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { successMessage } = useNotification();

  const handleLogout = () => {
    startTransition(() => {
      removeToken();
      successMessage({
        title: "Đăng Xuất",
        description: "Bạn đã đăng xuất thành công.",
      });
      navigate("/login");
    });
  };

  return (
    <div className="flex justify-between pt-4 px-4 bg-white  border-b border-gray-200 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center gap-6">
        <img src={logo} alt="" className="w-20 mt-[-10px]" />
        <TabComponent items={items} size="middle" />
      </div>
      <div>
        {token ? (
          <div className="flex items-center gap-4">
            <div className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full shadow-sm">
              <span className="mr-1">👋</span>
              Chào mừng con vợ,{" "}
              <span className="text-green-700">{user?.fullName}</span>!
            </div>
            <div
              onClick={handleLogout}
              className="flex justify-center items-center gap-2 hover:text-red-500 transition-colors duration-200"
            >
              <LuLogOut
                title="Đăng xuất"
                cursor="pointer"
                className="w-6 h-6"
              />
            </div>
          </div>
        ) : (
          <ButtonComponent
            className="flex justify-center items-center"
            onClick={() => startTransition(() => navigate("/login"))}
            disabled={isPending}
          >
            {isPending ? "Đang chuyển..." : "Đăng Nhập"}
          </ButtonComponent>
        )}
      </div>
    </div>
  );
};

export default Header;
