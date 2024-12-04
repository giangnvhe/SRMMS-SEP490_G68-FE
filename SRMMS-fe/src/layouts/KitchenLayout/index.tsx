import { ConfigProvider } from "antd";
import { Suspense, useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BREAKPOINT_SCREEN } from "~/common/const/const";
import Spinner from "~/components/Spiner";
import { useWindowSize } from "~/hooks/useWindowSize";
import NavStaff from "../KitchenLayout/components/NavStaff";
import SidebarStaff from "../KitchenLayout/components/SidebarStaff";
import classNames from "classnames";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const KitchenLayout = () => {

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
      <NavStaff
        isOpenSideBar={isOpenSideBar}
        handleHiddenSideBar={handleHiddenSideBar}
        handleShowSideBar={handleShowSideBar}
      />
      <div className={cx("admin-layout")}>
        <SidebarStaff isOpenSideBar={isOpenSideBar} isAdmin />
        <div className="body-layout">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  </ConfigProvider>
  );
};

export default KitchenLayout;
