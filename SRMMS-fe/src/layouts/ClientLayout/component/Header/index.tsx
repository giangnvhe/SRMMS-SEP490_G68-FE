import TabComponent from "~/components/TabsComponent";
import logo from "~/assets/images/logo-home.png";
import ButtonComponent from "~/components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useTransition, useState, useEffect } from "react";
import { useAuth } from "~/context/authProvider";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons
import useNotification from "~/hooks/useNotification";

const items = [
  { key: "1", label: "Trang chủ" },
  { key: "2", label: "Thực Đơn" },
  { key: "3", label: "Tin tức" },
  { key: "4", label: "Liên hệ" },
  { key: "4", label: "Đặt bàn" },
];

const Header = () => {
  const navigate = useNavigate();
  const { token, user, removeToken } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { successMessage } = useNotification();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? savedTab : "1";
  });

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

  const handleTabClick = (key: any) => {
    setActiveTab(key);
    setMenuOpen(false); // Close menu on selection
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/thuc-don");
        break;
      case "3":
        navigate("/tin-tuc");
        break;
      case "4":
        navigate("/lien-he");
        break;
      case "5":
        navigate("/booking");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Save activeTab to localStorage whenever it changes
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex justify-between items-center py-4 px-4 bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-16 md:w-20" />

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <AiOutlineClose className="w-6 h-6 cursor-pointer" />
          ) : (
            <AiOutlineMenu className="w-6 h-6 cursor-pointer" />
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <TabComponent
            items={items}
            size="middle"
            onChange={handleTabClick}
            activeKey={activeTab}
          />
        </div>
      </div>

      {/* Right side: User Greeting / Login Button */}
      <div className="flex items-center gap-2 md:gap-4">
        {token ? (
          <div className="hidden md:flex items-center gap-4">
            <div className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full shadow-sm text-xs md:text-sm">
              <span className="mr-1">👋</span>
              Chào mừng,{" "}
              <span className="text-green-700">{user?.fullName}</span>!
            </div>
            <div
              onClick={handleLogout}
              className="flex justify-center items-center gap-2 hover:text-red-500 transition-colors duration-200 cursor-pointer"
            >
              <LuLogOut title="Đăng xuất" className="w-5 h-5 md:w-6 md:h-6" />
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 md:hidden">
          <TabComponent
            items={items}
            size="small"
            onChange={handleTabClick}
            activeKey={activeTab}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
