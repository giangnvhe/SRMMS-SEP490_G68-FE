import {
  AppstoreOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TableOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
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
    label: "Employee Management",
    icon: <TeamOutlined />,
  },
  {
    key: "/admin/products",
    label: "Product Management",
    icon: <ProductOutlined />,
    children: [
      {
        key: "/admin/products",
        label: "Product List",
        icon: <FolderOpenOutlined />,
      },
      {
        key: "/admin/category",
        label: "Category List",
        icon: <ProductOutlined />,
      },
    ],
  },
  {
    key: "/admin/table",
    label: "Table Management",
    icon: <TableOutlined />,
  },
  {
    key: "/admin/role",
    label: "Role Management",
    icon: <UserAddOutlined />,
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
