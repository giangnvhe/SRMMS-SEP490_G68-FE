import { ConfigProvider, notification } from "antd";
import { NotiContext } from "./context/NotiContext";
import "./index.css";
import Routers from "./routers";
import AuthProvider from "./context/authProvider";

function App() {
  const [api, contextHolder] = notification.useNotification();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#57e1e4",
        },
        components: {
          Button: {
            primaryShadow: "0px 10px 20px -10px #57e1e4",
          },
        },
      }}
    >
      <AuthProvider>
        <NotiContext api={api} contextHolder={contextHolder}>
          <Routers />
        </NotiContext>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
