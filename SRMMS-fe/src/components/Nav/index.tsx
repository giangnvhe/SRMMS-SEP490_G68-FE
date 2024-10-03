import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

interface IProps {
  children: JSX.Element;
}

const Nav = ({ children }: IProps) => {
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
    <div className="w-full h-16">
      <div className="flex justify-end py-4 pr-8 border-b-[1px] border-gray-400 bg-local">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Nav;
