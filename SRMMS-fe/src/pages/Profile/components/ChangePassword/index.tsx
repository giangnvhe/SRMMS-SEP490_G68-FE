import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Typography } from "antd";
import React, { useState } from "react";
import { ChangePassword } from "~/services/account";

const { Title } = Typography;

const ChangePasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (values.newPassword !== values.confirmNewPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      const response = await ChangePassword({
        phone: values.phone,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });

      if (response) {
        message.success("Đổi mật khẩu thành công");
        form.resetFields();
      } else {
        message.error(
          "Đổi mật khẩu thất bại, vui lòng kiểm tra lại mật khẩu cũ và số điện thoại của bạn"
        );
      }
    } catch (error) {
      message.error(
        "Có lỗi xảy ra khi đổi mật khẩu, vui lòng kiểm tra lại mật khẩu cũ và số điện thoại của bạn"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 500,
        margin: "0 auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#08979C",
        }}
      >
        Thay Đổi Mật Khẩu
      </Title>
      <Form form={form} name="change_password" onFinish={onFinish}>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại phải là 10 chữ số",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Số điện thoại"
            maxLength={10}
          />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới",
            },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Mật khẩu phải chứa ít nhất một chữ cái và một số",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu mới"
          />
        </Form.Item>

        <Form.Item
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu mới",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu mới"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              backgroundColor: "#08979C",
              borderColor: "#08979C",
            }}
          >
            Đổi Mật Khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordPage;
