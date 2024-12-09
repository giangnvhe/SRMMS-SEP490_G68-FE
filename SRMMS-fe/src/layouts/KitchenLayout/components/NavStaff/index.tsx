import {
  BellOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  List,
  MenuProps,
  Space,
  Typography,
} from "antd";
import classNames from "classnames";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "~/assets/images/logo2.png";
import styles from "./index.module.scss";
import { useAuth } from "~/context/authProvider";
import socket from "~/common/const/socketKitchen";
import useNotification from "~/hooks/useNotification";

interface Props {
  isOpenSideBar: boolean;
  handleHiddenSideBar: () => void;
  handleShowSideBar: () => void;
}

interface Notification {
  id: string;
  message: string;
  status: string;
  nameBooking?: string;
}

const cx = classNames.bind(styles);

const NavStaff = ({
  isOpenSideBar,
  handleHiddenSideBar,
  handleShowSideBar,
}: Props) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { user, removeToken } = useAuth();
  const { successMessage } = useNotification();

  useEffect(() => {
    socket.on("orderUpdated", (orderData) => {
      const newNotification: Notification = {
        id: `order-${orderData.orderId}`,
        message: `Có đơn hàng mới được đưa tới bếp`,
        status: "pending",
      };

      setNotification((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);

      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, []);

  const handleNotificationVisibleChange = (visible: boolean) => {
    setNotificationVisible(visible);
    if (visible) {
      setUnreadCount(0);
    }
  };

  const clearAllNotifications = () => {
    setNotification([]);
    setUnreadCount(0);
  };

  const handleLogout = () => {
    startTransition(() => {
      removeToken();
      successMessage({
        title: "Đăng Xuất",
        description: "Bạn đã đăng xuất thành công.",
      });
      navigate("/home");
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex gap-2"
          onClick={() => {
            startTransition(() => {
              navigate(`/profile/${user?.id}`);
            });
          }}
        >
          <InfoCircleOutlined style={{ color: "green" }} />
          <p className="font-bold text-sm">Thông tin cá nhân</p>
        </div>
      ),
      key: "0",
    },
    {
      key: "1",
      icon: (
        <div
          onClick={handleLogout}
          className="flex justify-center items-center gap-2"
        >
          <LogoutOutlined style={{ color: "red" }} />
          <span className="font-bold text-sm">Đăng xuất</span>
        </div>
      ),
    },
  ];

  const NotificationList = () => (
    <Card
      title="Thông báo"
      extra={
        <Button type="text" danger onClick={clearAllNotifications}>
          Xóa tất cả
        </Button>
      }
      style={{ width: 300 }}
    >
      <List
        dataSource={notification}
        renderItem={(notif) => (
          <List.Item
            onClick={() => navigate("/kitchen")}
            key={notif.id}
            style={{
              borderBottom: "1px solid #f0f0f0",
              padding: "10px 15px",
              background: notif.status === "pending" ? "#fffbe6" : "#ffffff",
            }}
          >
            <div>
              <Typography.Text
                style={{
                  fontWeight: notif.status === "pending" ? "bold" : "normal",
                  color:
                    notif.status === "pending"
                      ? "orange"
                      : notif.status === "approved"
                      ? "green"
                      : "red",
                }}
              >
                {notif.message}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <div className={cx(styles["nav-wrapper"])}>
      <div className="nav-component">
        <div className="logo" onClick={() => navigate("/admin/dashboard")}>
          {isOpenSideBar ? (
            <CloseOutlined
              className="btn-expaned-sp"
              onClick={handleHiddenSideBar}
            />
          ) : (
            <MenuOutlined
              className="btn-expaned-sp"
              onClick={handleShowSideBar}
            />
          )}
          <img src={logo} className="object-cover w-32 h-full" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={cx("left-group-btn")} style={{ paddingRight: 20 }}>
            <Dropdown
              overlay={<NotificationList />}
              trigger={["click"]}
              open={notificationVisible}
              onOpenChange={handleNotificationVisibleChange}
            >
              <Space>
                <Badge count={unreadCount} offset={[0, 2]}>
                  <BellOutlined
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  />
                </Badge>
              </Space>
            </Dropdown>
          </div>
          <div className={cx("right-group-btn")}>
            <Dropdown
              className="drop-down-info"
              menu={{ items }}
              trigger={["click"]}
            >
              <Space>
                <Avatar src="" icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavStaff;
