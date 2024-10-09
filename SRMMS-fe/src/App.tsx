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
          colorPrimary: "#F16A22",
        },
        components: {
          Button: {
            primaryShadow: "0px 10px 20px -10px #F16A22",
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
