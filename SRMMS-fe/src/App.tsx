
import { notification } from "antd";
import { NotiContext } from "./context/NotiContext";
import "./index.css";
import Routers from "./routers";



function App() {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotiContext api={api} contextHolder={contextHolder}>
      <Routers />
    </NotiContext>

  );
}

export default App;
