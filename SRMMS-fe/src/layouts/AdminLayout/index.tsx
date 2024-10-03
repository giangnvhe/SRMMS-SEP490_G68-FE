import { ConfigProvider } from "antd";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#08979C",
        },
        components: {
          Button: {
            primaryShadow: "0px 10px 20px -10px #08979C",
            borderRadius: 2,
            borderRadiusLG: 2,
          },
          Input: {
            borderRadius: 2,
            borderRadiusLG: 2,
          },
          InputNumber: {
            borderRadius: 2,
            borderRadiusLG: 2,
          },
          Select: {
            borderRadius: 2,
            borderRadiusLG: 2,
          },
          DatePicker: {
            borderRadius: 2,
            borderRadiusLG: 2,
          },
        },
      }}
    >
      <div>
        <div className="flex">
          <Sidebar />
          <Nav>
            <Outlet />
          </Nav>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;
