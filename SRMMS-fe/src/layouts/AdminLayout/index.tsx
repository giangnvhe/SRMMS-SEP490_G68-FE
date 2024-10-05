import { ConfigProvider } from "antd";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Suspense, useLayoutEffect, useState } from "react";
import Spinner from "../../components/Spiner";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useWindowSize } from "../../hooks/useWindowSize";
import { BREAKPOINT_SCREEN } from "../../common/const/const";

const cx = classNames.bind(styles);

const AdminLayout = () => {

  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const resize = useWindowSize();

  const handleShowSideBar = () => {
    setIsOpenSideBar(true);
  };
  const handleHiddenSideBar = () => {
    setIsOpenSideBar(false);
  };

  useLayoutEffect(() => {
    if (window.innerWidth < BREAKPOINT_SCREEN.lg) {
      setIsOpenSideBar(false);
    }

    if (window.innerWidth > BREAKPOINT_SCREEN.lg) {
      setIsOpenSideBar(true);
    }
  }, [resize]);

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
          <Sidebar isOpenSideBar={isOpenSideBar}/>
          <div className={cx("admin-layout")}>
            <Nav>
              <div className="body-layout">
                <Suspense fallback={<Spinner />}>
                  <Outlet />
                </Suspense>
              </div>
            </Nav>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;
