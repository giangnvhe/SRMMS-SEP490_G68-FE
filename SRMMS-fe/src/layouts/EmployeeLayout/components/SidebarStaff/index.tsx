import {
  AppstoreOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TableOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { faClipboardList, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuProps } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { WIDTH_SIDE_BAR_PC, WIDTH_SIDE_BAR_SP } from "~/common/const/const";

const cx = classNames.bind(styles);
type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  isOpenSideBar: boolean;
  isAdmin?: boolean;
  className?: string;
}

const items: MenuItem[] = [
  {
    key: "/products",
    label: "Danh sách món",
    icon: <ProductOutlined />,
    children: [
      {
        key: "/product",
        label: "Danh sách món",
        icon: <FolderOpenOutlined />,
      },
      {
        key: "/category",
        label: "Danh sách loại món",
        icon: <ProductOutlined />,
      },
    ],
  },
  {
    key: "/tables",
    label: "Danh sách bàn",
    icon: <TableOutlined />,
  },
  {
    key: "/combos-list",
    label: "Danh sách combo",
    icon: <FontAwesomeIcon icon={faTh} />,
  },
  {
    key: "/order-list",
    label: "Quản lý Order",
    icon: <FontAwesomeIcon icon={faClipboardList} />,
  },
  {
    key: "/voucher",
    label: "Danh sách Voucher",
    icon: <FontAwesomeIcon icon={faTicket} />,
  },
  {
    key: "/booking-list",
    label: "Danh sách đặt bàn",
    icon: <FontAwesomeIcon icon={faClock} />,
  },
];

const SidebarStaff = ({ isOpenSideBar, isAdmin }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    navigate(e.key);
  };

  return (
    <div
      className={cx("sidebar-wrapper")}
      style={{ display: isOpenSideBar ? "block" : "none" }}
    >
      <div
        className={`sidebar-component ${isAdmin ? "sidebar-admin" : ""}`}
        style={{ width: collapsed ? WIDTH_SIDE_BAR_SP : WIDTH_SIDE_BAR_PC }}
      >
        <Menu
          onClick={onClick}
          //defaultSelectedKeys={[location.pathname]}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          inlineCollapsed={collapsed}
        />
        <div className="group-btn-bottom">
          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{ marginBottom: 8 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarStaff;
