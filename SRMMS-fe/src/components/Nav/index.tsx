import {
  CloseOutlined,
  LoginOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { removeAccessToken } from "../../configs/accessToken";
import useNotification from "../../hooks/useNotification";
import { logout } from "../../services/auth";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { AxiosError } from "axios";
import classNames from "classnames";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Logo from "../../assets/images/Logo.png";

interface Props {
  isOpenSideBar: boolean;
  handleHiddenSideBar: () => void;
  handleShowSideBar: () => void;
}

const Logout = () => {
  //const navigate = useNavigate();

  //const { errorMessage } = useNotification();

  const handleLogout = useMutation(logout, {
    onError: (error: AxiosError<{ message: string }>) => {
      //errorMessage({ description: error.response?.data.message || "" });
    },
    onSuccess: (result) => {
      //   if (result) {
      //     removeAccessToken();
      //     navigate("/login");
      //   }
    },
  });

  return (
    <div onClick={() => handleLogout.mutate()}>
      <LoginOutlined style={{ marginRight: "10px" }} />
      <span>Logout</span>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">Edit Profile</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">Change Password</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <Logout />,
    key: "3",
  },
];

const cx = classNames.bind(styles);

export default function Nav({
  isOpenSideBar,
  handleHiddenSideBar,
  handleShowSideBar,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className={cx(styles["nav-wrapper"])}>
      <div className="nav-component">
        <div className="logo" onClick={() => navigate("/")}>
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
          <img src={Logo} />
        </div>
        <div className={cx("right-group-btn")}>
          <Dropdown
            className="drop-down-info"
            menu={{ items }}
            trigger={["click"]}
          >
            <Space>
              <Avatar src="" icon={<UserOutlined />} />
              Click me
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
