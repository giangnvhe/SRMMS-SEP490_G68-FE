import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface Props {
  isOpenSideBar: boolean;
  isAdmin?: boolean;
}

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: "/admin/dashboard",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      key: "admin ",
      label: "Employee Management",
      icon: <TeamOutlined />,
      children: [
        {
          key: "/admin/employees",
          label: "List Employee",
        },
      ],
    },
    {
      key: "admin",
      label: "Ingredient Management",
      icon: <AppstoreOutlined />,
      children: [
        { key: "admin/ingredient", label: "List Ingredient" },
      ],
    },
    {
      key: "admin",
      label: "Blog Management",
      icon: <SettingOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
      ],
    },
    {
      key: "grp",
      label: "Group",
      type: "group",
      children: [
        { key: "13", label: "Option 13" },
        { key: "14", label: "Option 14" },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(`${e.key}`);
  };

  return (
    <div>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            inlineCollapsed={collapsed}
          />
    </div>
  );
};

export default Sidebar;
