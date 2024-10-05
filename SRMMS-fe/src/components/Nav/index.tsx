import { BellFilled, SmileOutlined } from "@ant-design/icons";
import { Avatar, Badge, Image, MenuProps, Space, Typography } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";
import logo from "../../assets/images/logo2.png";

const cx = classNames.bind(styles);

interface IProps {
  children: JSX.Element;
}

const Nav = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Information",
    },
    {
      key: "2",
      label: "Logout",
      icon: <SmileOutlined />,
    },
  ];
  return (
    // <div className="w-full h-16">
    //   <div className="flex justify-end py-4 pr-8 border-b-[1px] border-gray-400 bg-local">
    //     <Dropdown menu={{ items }}>
    //       <a onClick={(e) => e.preventDefault()}>
    //         <Space>
    //           <Avatar
    //             style={{ backgroundColor: "#87d068" }}
    //             icon={<UserOutlined />}
    //           />
    //           <DownOutlined />
    //         </Space>
    //       </a>
    //     </Dropdown>
    //   </div>
    //   <div>{children}</div>
    // </div>
    <div className={cx(styles["nav-container"])}>
      <Image src={logo} alt="No picture" width={70}></Image>
      <Typography.Title>Welcome To Management System</Typography.Title>
      <Space>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
        <Avatar />
      </Space>
    </div>
  );
};

export default Nav;
