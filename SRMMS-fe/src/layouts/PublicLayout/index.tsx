import { Suspense } from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Spinner from "~/components/Spiner";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <div className="content-wrapper pt-[85px] mb-5">
          <div className="body-layout">
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
