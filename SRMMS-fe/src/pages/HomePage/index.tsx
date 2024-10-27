import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <div className="content-wrapper pt-[75px]">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
