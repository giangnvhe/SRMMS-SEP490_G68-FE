import { Space } from "antd";
import Nav from "../../components/Nav";
import styles from "./index.module.scss";
import classNames from "classnames";
import Sidebar from "../../components/Sidebar";
import FooterComponent from "../../components/Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../../components/Spiner";

const cx = classNames.bind(styles);

const AdminLayout = () => {
  return (
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: "#08979C",
    //     },
    //     components: {
    //       Button: {
    //         primaryShadow: "0px 10px 20px -10px #08979C",
    //         borderRadius: 2,
    //         borderRadiusLG: 2,
    //       },
    //       Input: {
    //         borderRadius: 2,
    //         borderRadiusLG: 2,
    //       },
    //       InputNumber: {
    //         borderRadius: 2,
    //         borderRadiusLG: 2,
    //       },
    //       Select: {
    //         borderRadius: 2,
    //         borderRadiusLG: 2,
    //       },
    //       DatePicker: {
    //         borderRadius: 2,
    //         borderRadiusLG: 2,
    //       },
    //     },
    //   }}
    // >
    //   <div className={cx(styles["admin-layout-container"])}>
    //     <div className="flex">
    //       <Sidebar isOpenSideBar={isOpenSideBar}/>
    //       <div className={cx("admin-layout")}>
    //         <Nav>
    //           <div className="body-layout">
    //             <Suspense fallback={<Spinner />}>
    //               <Outlet />
    //             </Suspense>
    //           </div>
    //         </Nav>
    //       </div>
    //     </div>
    //   </div>
    // </ConfigProvider>
    <div className={cx(styles["admin-layout-container"])}>
      <Nav />
      <Space className="menu-content">
        <Sidebar></Sidebar>
        <div className="body-layout">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </Space>
      <FooterComponent />
    </div>
  );
};

export default AdminLayout;
