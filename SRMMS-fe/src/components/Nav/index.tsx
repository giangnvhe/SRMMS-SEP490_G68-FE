import { Avatar, Dropdown, MenuProps, Space } from "antd";
import classNames from "classnames";
import logo from "../../assets/images/logo2.png";
import styles from "./index.module.scss";
import {
  CloseOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logout from "../../pages/Logout";

interface Props {
  isOpenSideBar: boolean;
  handleHiddenSideBar: () => void;
  handleShowSideBar: () => void;
}

const cx = classNames.bind(styles);

const NavComponent = ({
  isOpenSideBar,
  handleHiddenSideBar,
  handleShowSideBar,
}: Props) => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex gap-2" onClick={() => navigate("/profile")}>
          <InfoCircleOutlined style={{ color: "green" }} />
          <p className="font-bold text-sm">Information</p>
        </div>
      ),
      key: "0",
    },
    {
      key: "1",
      icon: (
        <div
          onClick={() => navigate("/admin/logout")}
          className="flex justify-center items-center gap-2"
        >
          <LogoutOutlined style={{ color: "red" }} />
          <span className="font-bold text-sm">Log out</span>
        </div>
      ),
    },
  ];
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
  );
};

export default NavComponent;
