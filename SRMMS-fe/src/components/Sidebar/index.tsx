import classNames from "classnames";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { Button, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WIDTH_SIDE_BAR_PC, WIDTH_SIDE_BAR_SP } from "../../common/const/const";

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
    key: "/admin/ingredients",
    label: "Ingredient Management",
    icon: <ProductOutlined />,
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
