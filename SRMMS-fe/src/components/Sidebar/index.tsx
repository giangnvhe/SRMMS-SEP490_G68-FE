import {
  AppstoreOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TableOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { faClipboardList, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuProps } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WIDTH_SIDE_BAR_PC, WIDTH_SIDE_BAR_SP } from "../../common/const/const";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);
type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  isOpenSideBar: boolean;
  isAdmin?: boolean;
}

const items: MenuItem[] = [
  {
    key: "/admin/dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/admin/employees",
    label: "Quản lý nhân viên",
    icon: <TeamOutlined />,
  },
  {
    key: "/admin/products",
    label: "Quản lý món",
    icon: <ProductOutlined />,
    children: [
      {
        key: "/admin/product",
        label: "Danh sách món",
        icon: <FolderOpenOutlined />,
      },
      {
        key: "/admin/category",
        label: "Danh sách loại món",
        icon: <ProductOutlined />,
      },
    ],
  },
  {
    key: "/admin/tables",
    label: "Quản lý bàn",
    icon: <TableOutlined />,
  },
  {
    key: "/admin/combo",
    label: "Quản lý combo",
    icon: <FontAwesomeIcon icon={faTh} />,
  },
  {
    key: "/admin/order",
    label: "Quản lý Order",
    icon: <FontAwesomeIcon icon={faClipboardList} />,
  },
];

const SidebarComponent = ({ isOpenSideBar, isAdmin }: Props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
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
          defaultSelectedKeys={[location.pathname]}
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

export default SidebarComponent;
