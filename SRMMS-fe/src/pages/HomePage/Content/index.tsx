import classNames from "classnames";
import styles from "./index.module.scss";
import Grap1 from "./grap1";
import Grap2 from "./Grap2";
import Grap3 from "./Grap3";
import { useState } from "react";
import { Button, Form, Modal } from "antd";
import InputComponent from "~/components/InputComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import { MessageOutlined } from "@ant-design/icons";

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
        title={
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              padding: "16px 0",
            }}
          >
            Đặt Bàn
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <InputComponent
            form={form}
            name="name"
            label="Họ Tên"
            placeholder="Nhập tên của bạn"
          />
          <InputComponent
            form={form}
            name="phone"
            label="Số Điện Thoại"
            placeholder="Số điện thoại của bạn"
          />
          <InputComponent
            form={form}
            name="email"
            label="Email"
            placeholder="email của bạn"
          />
          <DatePickerComponent form={form} name="date" label="Chọn ngày" />
          <div className="flex justify-end">
            <Button type="default" className="font-bold bg-lime-500">
              Đặt Bàn
            </Button>
          </div>
        </Form>
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
