import React, { startTransition, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "~/context/authProvider";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "~/configs/accessToken";
import useNotification from "~/hooks/useNotification";
import { permissionObject } from "~/common/const/permission";

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const ProfileLayout = ({
  children,
  selectedKey,
  setSelectedKey,
}: {
  children: React.ReactNode;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { successMessage } = useNotification();

  const handleGoBack = () => {
    startTransition(() => {
      if (
        user?.roleName === permissionObject.STAFF.CASHIER ||
        user?.roleName === permissionObject.STAFF.SERVICE_STAFF
      ) {
        navigate("/tables");
      } else if (
        user?.roleName === permissionObject.ADMIN ||
        user?.roleName === permissionObject.MANAGER
      ) {
        navigate("/admin/dashboard");
      } else if (user?.roleName === permissionObject.KITCHEN) {
        navigate("/kitchen");
      } else {
        navigate("/home");
      }
    });
  };

  const siderMenu = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin",
      onClick: () => setSelectedKey("profile"),
    },
    {
      key: "password",
      icon: <LockOutlined />,
      label: "Đổi mật khẩu",
      onClick: () => setSelectedKey("password"),
    },
    {
      key: "restaurant",
      icon: <HomeOutlined />,
      label: "Quay lại nhà hàng",
      onClick: handleGoBack,
    },
  ];

  const handleLogout = () => {
    startTransition(() => {
      removeAccessToken();
      successMessage({
        title: "Đăng Xuất",
        description: "Bạn đã đăng xuất thành công.",
      });
      navigate("/home");
    });
  };

  const userMenu = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        handleLogout;
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        theme="light"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginRight: 16, backgroundColor: "#08979C" }}
          />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {user?.fullName || "Người dùng"}
            </Title>
            <Typography.Text type="secondary">
              {user?.roleName || "Chưa xác định"}
            </Typography.Text>
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={siderMenu}
          style={{ borderRight: "none" }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#08979C" }}
            />
          </Dropdown>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileLayout;
