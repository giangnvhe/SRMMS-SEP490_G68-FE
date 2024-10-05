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

const Sidebar = ({ isOpenSideBar: initialIsOpenSideBar, isAdmin }: Props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(initialIsOpenSideBar);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleSidebar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  const items: MenuItem[] = [
    {
      key: "admin ",
      label: "Employee Management",
      icon: <TeamOutlined />,
      children: [
        {
          key: "/admin/listEmployee",
          label: "List Employee",
        },
      ],
    },
    {
      key: "sub2",
      label: "Ingredient Management",
      icon: <AppstoreOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        {
          key: "sub3",
          label: "Blog Management",
          children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "sub4",
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
      <div className="h-16 flex justify-center items-center text-4xl font-bold text-blue-500">
        SRMMS
      </div>
      <div
        className={cx("sidebar-wrapper")}
        style={{ display: isOpenSideBar ? "block" : "none" }}
      >
        <div className={`sidebar-component ${isAdmin ? "sidebar-admin" : ""}`}>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
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
    </div>
  );
};

export default Sidebar;
