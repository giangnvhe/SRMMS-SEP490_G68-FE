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

interface Props {
  isOpenSideBar: boolean;
  handleHiddenSideBar: () => void;
  handleShowSideBar: () => void;
}

const items: MenuProps["items"] = [
  {
    label: <InfoCircleOutlined />,
    key: "0",
  },
  {
    label: <LogoutOutlined />,
    key: "1",
  },
];

const cx = classNames.bind(styles);

const NavComponent = ({
  isOpenSideBar,
  handleHiddenSideBar,
  handleShowSideBar,
}: Props) => {
  const navigate = useNavigate();
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
