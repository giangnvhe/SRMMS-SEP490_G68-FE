import classNames from "classnames";
import styles from "./index.module.scss";
import Grap1 from "./grap1";
import Grap2 from "./Grap2";
import Grap3 from "./Grap3";
import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import BookingForm from "~/pages/Client/BookingTable/BookingForm";

const cx = classNames.bind(styles);

const Content = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={cx(styles["content-container"])}>
      <div className={cx("content-line")}>
        <div className={cx("content-line-text")}>
          <h1>Chào mừng đến với Tinh Hoa Ẩm Thực</h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showModal();
            }}
          >
            Đặt Bàn
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap1 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap2 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap3 />
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        width={900}
      >
        <BookingForm />
      </Modal>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined style={{ fontSize: "24px" }} />}
        size="large"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 1000,
        }}
        onClick={() => {
          console.log("Chat icon clicked");
        }}
      />
    </div>
  );
};

export default Content;
